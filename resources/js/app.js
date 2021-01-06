// window._ = require('lodash');
const Showdown  = require('showdown');
const mdConverter = new Showdown.Converter();

try {
    // window.Popper = require('popper.js').default;
    // window.$ = window.jQuery = require('jquery');

    // require('bootstrap');
} catch (e) {}
// window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const header = document.querySelector('header')
const navbar = document.querySelector('.navbar');
const navbarBrand = document.querySelector('.navbar-brand');
const sizeScrollNav = 20 + (header?header.getBoundingClientRect().height:0);
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse.collapse');
const sections = document.querySelectorAll('.section');
const sectionsWithItems = document.querySelectorAll('.section.items');

function getViewport() {

    var viewPortWidth;
    var viewPortHeight;
   
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
      viewPortWidth = window.innerWidth,
      viewPortHeight = window.innerHeight
    }
   
   // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
    && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
       viewPortWidth = document.documentElement.clientWidth,
       viewPortHeight = document.documentElement.clientHeight
    }
   
    // older versions of IE
    else {
      viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
      viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    window.viewport = {
        width: viewPortWidth,
        height: viewPortHeight
    }
}

// function scrollFunction() {
//     if (document.body.scrollTop > sizeScrollNav || document.documentElement.scrollTop > sizeScrollNav) {
//         navbar.classList.add('fixed-top');
//         navbarBrand.style.fontSize = "1.5rem";
//         navbarBrand.innerText = "Rachel Bourgeois";
//         navbar.minHeight = '65px';
//     } else {
//         navbar.classList.remove('fixed-top');
//         navbarBrand.style.fontSize = "3rem";
//         navbarBrand.innerText = "Ψ";
//         navbar.height = 'auto';
//     }
// }


function scrollFunction(e) {
    if(++window.scrollCounter >10) {
        // actParallaxList();
    }
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if(st == lastScrollTop) return
    // parallaxItemsToShow.forEach((item, index)=>{
    parallaxItems.forEach((item, index)=>{
        if(!item.classList.contains('toShow')) return;
        if(parallaxItemsParams[index].showedAt == undefined) parallaxItemsParams[index].showedAt = st;
        item.style.top = parseFloat(parallaxItemsParams[index].styles.top.engineVal)+parseFloat(item.dataset.sensibility)*(st-parallaxItemsParams[index].showedAt)+parallaxItemsParams[index].styles.top.unit
    })

    // sectionsWithItems.forEach(section=>{
    //     if( section.scrollHeight+150 > st && st > section.scrollHeight - 150) {
    //         section.querySelector('.imageCenter').classList.add('pop')
    //         let poppers = section.querySelectorAll('.popper');
    //         poppers.forEach((popper, index)=>{
    //             popper.style.animationDelay = 1.5*index/poppers.length+"s";
    //             popper.classList.add('pop')
    //         })
    //     }
    // })
    lastScrollTop = st <= 0 ? 0 : st;
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop-200, left: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {
    getViewport()
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(el => (el.onclick = scrollAnchors));

    popup.getEl('Close').addEventListener('click', function() {
        popup.hide()
    })
    popup.getEl('Hidder').addEventListener('click', function() {
        popup.hide()
    })
    loadSections()

    document.querySelectorAll('.item').forEach(item=>{
        item.addEventListener("click", function() {
            popup.show(item.dataset.title, mdConverter.makeHtml(item.dataset.desc.decoded), {
                text: 'Visiter',
                href: item.dataset.href
            })
        })
    })
    window.lastScrollTop = 0;
    window.parallaxItemsToShow = document.querySelectorAll('.section-parallaxItem.toShow');
    window.parallaxItems = document.querySelectorAll('.section-parallaxItem');
    window.addEventListener('scroll', scrollFunction);
    window.addEventListener('touchmove', scrollFunction);

    window.parallaxObserver = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting === true) {
            entries[0]['target'].classList.add('toShow');
        } else {
            entries[0]['target'].classList.remove('toShow');
        }
    }, { threshold: [0] });

    window.popObserver = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting === true) {
            let section = entries[0]['target'];
            section.querySelector('.imageCenter').classList.add('pop')
            let poppers = section.querySelectorAll('.popper');
            poppers.forEach((popper, index)=>{
                popper.style.animationDelay = 1.5*index/poppers.length+"s";
                popper.classList.add('pop')
            })
        } else {
            // entries[0]['target'].classList.remove('toShow');
        }
    }, { threshold: [0.95] });
    
    document.querySelectorAll(".section-parallaxItem").forEach(item=>{
        parallaxObserver.observe(item);
    })
    sectionsWithItems.forEach(section=>{
        popObserver.observe(section)
    })
});


navbarToggler.onclick = function() {
    navbarCollapse.classList.toggle('show');
}

class CssVal {
    constructor(value, unit='') {
        this.isMobileScreen = window.screen.width<768
        this.value = value,
        this.unit = unit;
    }
    get engineVal() {
        if(typeof this.value == 'number') {
            return this.value
        } else {
            return this.isMobileScreen?this.value[0]:this.value[1]
        }
    }
    get val() {
        return this.engineVal+this.unit
    }
    
    mBy(n) {
        return this.engineVal*n+this.unit
    }
    
    dBy(n) {
        return this.engineVal/n+this.unit
    }
}
class ParallaxItem {
    constructor(params) {
        this.params = params;
    }

    get sensibility() {
        return this.params.sensibility || -0.8
    }

    get styles() {
        return this.params.styles || {
            top: '-40px',
            right: '10px'
        }
    }

    get shapeFile() {
        return this.params.shapeName || 'shape1.svg'
    }

    get innerHTML() {
        return this.params.innerHTML || ''
    }

    get type() {
        return this.params.type || 'shape'
    }

    getHtml(index) {
        let node = document.createElement("div");
        node.classList.add("section-parallaxItem");
        node.classList.add("parallaxItem-"+index);
        node.dataset.sensibility = this.sensibility;
        for (let [key, value] of Object.entries(this.styles)) {
            node.style[key] = value.val;
        }

        if(this.type=='shape') {
            node.style.content = `url('/assets/shapes/${this.shapeFile}`;
        } else if(this.type=='html') {
            node.innerHTML = this.innerHTML;
        }
        return node
    }
}

// const parallaxParams = {
//     0: ['1.jpg', -0.8, {
//         // top: -370,
//         top: -40,
//         // right: -400
//         right: 10
//     }],
//     1: ['2.jpg', -0.6, {
//         // top: -470,
//         // left: -570
//         top: -100,
//         left: 10
//     }],
//     2: ['3.svg', -1.2, {
//         top: 470,
//         right: 20
//     }],
//     3: ['4.svg', -0.8, {
//         top: 170,
//         left: 10
//     }]
// }

const parallaxItemsParams = {
    0: new ParallaxItem({
        type: 'html',
        sensibility: -0.4, 
        styles: {
            // top: -370,
            top: new CssVal(-90,'px'),
            // right: -400
            left: new CssVal(50,'%'),
            height: new CssVal(150,'px'),
            width: new CssVal(150,'px'),
            zIndex: new CssVal(100)
        },
        innerHTML: `
        <img src="/assets/img/me1.jpg" class="circle">
        `
    }),
    1: new ParallaxItem({
        type: 'shape',
        shapeName: 'shape1.svg',
        sensibility: -0.4, 
        styles: {
        // top: -370,
        top: new CssVal(300, 'px'),
        // right: -400
        right: new CssVal(-10, 'px'),
        zIndex: new CssVal(1000),
        height: new CssVal([60,100],'px'),
        width: new CssVal([60,100],'px')
        }
    }),
    2: new ParallaxItem({
        type: 'shape',
        shapeName: 'shape1.svg',
        sensibility: -0.4, 
        styles: {
        // top: -370,
        top: new CssVal(200, 'px'),
        // right: -400
        left: new CssVal(50, 'px'),
        zIndex: new CssVal(1000),
        height: new CssVal([30,70],'px'),
        width: new CssVal([30,70],'px')
        }
    }),
    1: new ParallaxItem({
        type: 'shape',
        shapeName: 'shape1.svg',
        sensibility: -0.4, 
        styles: {
        // top: -370,
        top: new CssVal(300, 'px'),
        // right: -400
        right: new CssVal(-10, 'px'),
        zIndex: new CssVal(1000),
        height: new CssVal([60,100],'px'),
        width: new CssVal([60,100],'px')
        }
    }),
}

const loadSections = function() {
    sections.forEach((section, index)=>{
        if(Object.keys(parallaxItemsParams).includes(index.toString())) {
            let content = section.querySelector('.section-content');
            content.innerHTML = mdConverter.makeHtml(content.innerText.decoded);
            section.appendChild(parallaxItemsParams[index].getHtml(index));
        }
    })
    
    sectionsWithItems.forEach((section, index)=>{
        let items = section.querySelectorAll('.item');
        let sectionItems = section.querySelector('.section-items');
        let n = items.length;
        let angle = (360 / n);
        let rot = 0;
        let circleSize = new CssVal([200,350],'px');
        let itemSize = new CssVal([60,70], 'px');
        items.forEach((item, index)=>{
            item.style.position = 'absolute';
            item.style.height = itemSize.val; 
            item.style.width = itemSize.val; 
            item.style.margin = itemSize.dBy(-2);
            item.style.top = '50%';
            item.style.left = '50%';
            item.style.transformOrigin = 'center';
            item.style.transform = ` 
            rotate( calc(${rot} * 1deg))
            translate( ${circleSize.dBy(2)}) 
            rotate( calc(${rot} * -1deg))
            `;
            rot+=angle;
            item.querySelector('img').classList.add('rotate-reverse');
        })
        sectionItems.innerHTML+=`<div class="section-heighter rotate-reverse" style="height:${circleSize.mBy(1.6)}">
            <img class="imageCenter popper" src="/assets/img/apple/apple-touch-icon-180x180.png" style="height:${circleSize.dBy(2.5)}; width: ${circleSize.dBy(2.5)}">
        </div>`;
        sectionItems.classList.add('rotate');
    })
}


const popup = {
    el: document.getElementById('popup-box'),
    getEl: function(elName) {
        return this.el.querySelector('.popup'+elName)
    },
    show: function(title, content, link) {
        this.getEl('Title').innerText = title;
        this.getEl('Content').innerHTML = content.replace(/\n/g, '<br>');
        this.getEl('Link').innerText = link.text;
        this.getEl('Link').href = link.href;
        this.el.classList.add('show');
    },
    hide: function() {
        this.el.classList.remove('show');
    }
}
