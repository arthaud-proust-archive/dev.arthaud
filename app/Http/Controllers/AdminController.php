<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use File;
use App\Models\Section;
use Validator;
use Session;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }



    public function index()
    {
        $short_sections = Section::select('id','order', 'pages', 'type','title', 'image_url', 'anchor')->orderBy('order')->get();
        return view('admin.index', compact('short_sections'));
    }



    public function createSection()
    {
        return view('section.create');
    }

    public function storeSection(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'pages' => 'required|string',
            'type' => 'required|string',
            'content' => 'required',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp'
        ]);
        if ($validator->fails()) {
            if(request('type')=='items') {
                return response()->json($validator->messages(), 400);
            }
            return back()->withInput()->withErrors($validator);
        }

        $sectionBody = [
            'title' => request('title'),
            'pages' => request('pages'),
            'type' => request('type'),
            'content' => request('content'),
            'anchor' => $request->has('anchor'),
            'order' => Section::max('order')+1,
            'links' => request('links'),
        ];

        if(request('image_url')) {
            // try {
            //     if($user->img !="/assets/profiles/user.png") {
            //         File::delete(public_path().$user->img);
            //     }
            // } catch(Exception $e) {
            //     // nothing
            // };
    
            $imageName = Str::orderedUuid().'.'.request('image_url')->getClientOriginalExtension();
            request('image_url')->move(public_path('img/'), $imageName);
    
            // $user->img = '/assets/profiles/'.$imageName;
            // $user->save();

            $sectionBody['image_url'] = $imageName;
        }

        if(request('items')) {
            $sectionBody['items'] = request('items');
        }

        $section = Section::create($sectionBody);

        if(request('type')=='items') {
            return response()->json(['section_id'=>$section->id], 200);
        } else {
            return redirect()->route('admin');
        }
    }



    public function editSection(Request $request, $id)
    {
        $section =  Section::firstWhere('id', $id);
        return view('section.edit', compact('section'));
    }

    public function updateSection(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'pages' => 'required',
            'content' => 'required',
            'items' => 'nullable',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp'
        ]);
        if ($validator->fails()) {
            return back()->withInput()->withErrors($validator);
        }

        if(!$section = Section::firstWhere('id', $id)) {
            return abort(404);
        }
        $section->title = request('title');
        $section->pages = request('pages');
        $section->content = htmlspecialchars(request('content'));
        $section->anchor = $request->has('anchor');
        $section->links = request('links');

        if(request('items')) {
            $section->items = request('items');
        }

        if(request('image_url')) {
            try {
                File::delete(public_path('img/').$section->image_url);
            } catch(Exception $e) {
                // nothing
            };
            $imageName = Str::orderedUuid().'.'.request('image_url')->getClientOriginalExtension();
            request('image_url')->move(public_path('img/'), $imageName);
    

            $section->image_url = $imageName;
        }

        $section->save();

        return redirect()->route('admin');
    }

    public function addImageItem(Request $request, $section_id) {
        $validator = Validator::make($request->all(), [
            'item_index' => 'required',
            'image' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }
        if(!$section=Section::firstWhere('id',$section_id)) {
            return response()->json(['error'=>'not found'], 404);
        }
        $items = json_decode($section->items, true);

        try {
            if(request('item_index') < count($items) ) {
                File::delete(public_path().$items[request('item_index')][0]);
            }
        } catch(Exception $e) {};

        $imageName = 'item'.request('item_index').'.'.request('image')->getClientOriginalExtension();
        $path = public_path('img/section'.$section_id.'/');
        request('image')->move($path, $imageName);
        $newPath = '/img/section'.$section_id.'/'.$imageName;
        if(request('item_index') < count($items) ) {
            $items[request('item_index')][0] = $newPath;
        }
        $section->items = json_encode($items);
        $section->save();
        return response()->json([
            'new_path' => '/img/section'.$section_id.'/'.$imageName
        ]);
    }


    public function destroySection(Request $request, $id) {
        if(!$section = Section::firstWhere('id', $id)) {
            return abort(404);
        }

        try {
            File::delete(public_path('img/').$section->image_url);
            File::deleteDirectory(public_path('img/section'.$section->id));
        } catch(Exception $e) {
            // nothing
        };
        
        $section->delete();

        return redirect()->route('admin');
    }



    public function updateOrders(Request $request) {
        $validator = Validator::make($request->all(), [
            'orders' => 'required|json',
        ]);
        if ($validator->fails()) {
            return back()->withInput()->withErrors($validator);
        }
        $orders = json_decode(request('orders'), true);
        foreach($orders as $id => $order) {
            Section::where('id', $id)->update(['order'=>$order]);
        }
        return redirect()->route('admin');
    }
}
