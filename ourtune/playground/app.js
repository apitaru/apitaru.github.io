function Pluck(t){this.isActive=!1,this.ph=0,this.startPoint=new Point(0,0),this.endPoint=new Point(0,0),this.pr=t}Pluck.prototype.initData=function(t,e,i,s){this.id=t,this.movePerFrame=i,this.isLow=s,this.direction=e,this.count=0,this.damp=.94,this.waveIsActive=!1,this.attachedToPoint=!1,this.notes=[],this.controlPoint=void 0,this.controlNote=void 0},Pluck.prototype.getDirection=function(){return this.direction},Pluck.prototype.setNotes=function(t){this.notes=t},Pluck.prototype.setStartEndPoints=function(t,e){this.startPoint=t,this.endPoint=e},Pluck.prototype.renderToCanvas=function(t,e,i,s){var n=Math.atan2(t.x-e.x,t.y-e.y);this.pr.push(),this.pr.noFill(),this.pr.strokeWeight(this.isLow?3:1),this.lastNotePlucked?this.pr.stroke(this.lastNotePlucked.ch,this.lastNotePlucked.cs,this.lastNotePlucked.cb):this.pr.stroke(100),!n||!this.waveIsActive||Math.abs(n)<1e-4||Math.abs(n)>Math.PI-1e-4?this.pr.line(Math.round(e.x),Math.round(e.y),Math.round(s.x),Math.round(s.y)):this.waveIsActive&&(s=1.5,n>Math.PI/2?this.pr.arc(Math.round(t.x),Math.round(t.y),2*t.r,2*t.r,Math.PI*s+n,Math.PI*s-n,this.pr.OPEN):this.pr.arc(Math.round(t.x),Math.round(t.y),2*t.r,2*t.r,Math.PI*s-n,Math.PI*s+n,this.pr.OPEN)),this.pr.pop()},Pluck.prototype.findControlPoint=function(){if(this.direction<0)for(let t=0;t<this.notes.length&&(!this.notes[t].d.isActive||this.notes[t].isTraveling||this.notes[t].isCued||this.notes[t].isStarted||!(this.pr.abs(this.notes[t].y-this.notes[t].d.size/2-this.startPoint.y)<=this.movePerFrame)||(this.setControlPoint(this.notes[t]),this.controlNote&&this.controlNote==this.notes[t]));t++);else for(let t=this.notes.length-1;0<=t&&(!this.notes[t].d.isActive||this.notes[t].isTraveling||this.notes[t].isCued||this.notes[t].isStarted||!(this.pr.abs(this.startPoint.y-(this.notes[t].y+this.notes[t].d.size/2))<=this.movePerFrame)||(this.setControlPoint(this.notes[t]),this.controlNote&&this.controlNote==this.notes[t]));t--);},Pluck.prototype.setControlPoint=function(t){this.controlNote&&this.controlNote!=t&&this.pluckNote(this.controlNote),this.controlNote&&this.controlNote==t||(this.controlPoint=new Point(t.x,t.y+this.direction*t.d.size/2),this.controlNote=t)},Pluck.prototype.pluckNote=function(t){t.play(this.isLow),"function"==typeof this.pr.pitaru_playNote&&this.pr.pitaru_playNote(t,this),(this.lastNotePlucked=t).isAttached=!1,this.controlNote=void 0,this.controlPoint=void 0},Pluck.prototype.draw=function(){if(this.isActive)if(this.findControlPoint(),this.controlPoint&&this.controlNote||this.lastNotePlucked){var e,i=this.controlPoint||this.lastNotePlucked;let t;this.controlPoint&&(t=circleCenter(new Point(this.startPoint.x,this.startPoint.y),new Point(i.x,i.y),new Point(this.endPoint.x,this.endPoint.y))),this.controlPoint&&4500<this.pr.abs(t.r)&&i.x>this.startPoint.x&&i.x<this.endPoint.x?(this.attachedToPoint=!0,this.controlNote.isAttached=!0,this.renderToCanvas(t,this.startPoint,i,this.endPoint),this.count=0,this.waveIsActive=!0):(this.controlNote&&this.controlNote.isAttached&&this.pluckNote(this.controlNote),e=(this.lastNotePlucked||i).x,i=this.startPoint.y+2*Math.cos(this.count/2*Math.PI)*Math.pow(this.damp,this.count),Math.pow(this.damp,this.count)<.01&&(this.waveIsActive=!1),e=new Point(e,i),i=circleCenter(new Point(this.startPoint.x,this.startPoint.y),e,new Point(this.endPoint.x,this.endPoint.y)),this.renderToCanvas(i,this.startPoint,e,this.endPoint),this.count++)}else this.renderToCanvas(0,this.startPoint,this.startPoint,this.endPoint)};let circleCenter=function(t,e,i){var s=(e.y-t.y)/(e.x-t.x),n=(i.y-e.y)/(i.x-e.x),n=(s*n*(t.y-i.y)+n*(t.x+e.x)-s*(e.x+i.x))/(2*(n-s)),e=-1*(n-(t.x+e.x)/2)/s+(t.y+e.y)/2;return{x:n,y:e,r:_dist(n,e,t.x,t.y)}},_dist=function(t,e,i,s){return Math.sqrt((t-=i)*t+(e-=s)*e)},Point=function(t,e){this.x=t,this.y=e};function generateTunesFromHashV1(l,c,d,e,p,i,u,s){var w=[.5,0,.7,1],f=[0,0,0,0],v=[1,1,.7,.2],P=[1,1,0,1],y=e;let m=s,g=0;for(let h=0;h<d;h++){t=i[h];let n={};n.scaleArray=p,n.notes=[],n.plucks=[];let e={};e.direction=.5<fxrand()?1:-1,e.movePerFrame=.75<fxrand()?.5:1,e.isLow=!1,e.id=0,n.plucks.push(e),e={},e.direction=.5<fxrand()?1:-1,e.movePerFrame=.25<fxrand()?.5:1,e.isLow=!0,e.id=1,n.plucks.push(e);let o=!1;l||(o=.8<fxrand()),u?(0==h&&(n.plucks[0].direction=1,n.plucks[1].direction=-1,n.plucks[0].movePerFrame=1,n.plucks[1].movePerFrame=.5),1==h&&(n.plucks[0].direction=-1,n.plucks[1].direction=-1,n.plucks[0].movePerFrame=1,n.plucks[1].movePerFrame=o?0:.6,o&&g++),2==h&&(n.plucks[0].direction=1==n.plucks[0].direction?-1:1,n.plucks[0].movePerFrame=o?0:.5,n.plucks[1].movePerFrame=.5,o&&g++),3==h&&(n.plucks[0].direction=1,n.plucks[1].direction=1,n.plucks[0].movePerFrame=.5,n.plucks[1].movePerFrame=1)):(0==t&&(n.plucks[0].direction=1,n.plucks[1].direction=-1,n.plucks[0].movePerFrame=1,n.plucks[1].movePerFrame=.5),1==t&&(n.plucks[0].direction=-1,n.plucks[1].direction=-1,n.plucks[0].movePerFrame=1,n.plucks[1].movePerFrame=o?0:.5,o&&g++),2==t&&(n.plucks[0].direction=1==n.plucks[0].direction?-1:1,n.plucks[0].movePerFrame=.5,n.plucks[1].movePerFrame=.5),3==t&&(n.plucks[0].direction=1,n.plucks[1].direction=1,n.plucks[0].movePerFrame=o?0:.5,n.plucks[1].movePerFrame=1,o&&g++)),n.plucks[0].direction==n.plucks[1].direction&&n.plucks[0].movePerFrame==n.plucks[1].movePerFrame&&(n.plucks[1].direction*=-1);let r=[],s=0,a=0;if(l||3!=t)for(let e=0;e<y;e++)fxrand()>v[t]&&a<2&&0!=e?(s=r[e-1],a++):(s=m.map(fxrand(),0,1,.07,.93),a=0),r.push(s);else{let i=0;for(let e=0;e<y;e++)fxrand()>v[t]&&a<2&&0!=e?(s=r[e-1],a++):0<e?(s=m.map(r[Math.max(e-1,0)]+(0<a?.5:.025)+fxrand()/y,0,1,.07,.93),a=0):s=m.map(.1*fxrand(),0,1,.07,.93),s>i&&(i=s),r.push(s);for(let t=1;t<r.length;t++)r[t]=m.map(r[t],0,i,.07,.93)}r=r.sort();for(let s=0;s<y;s++){let i={};if(u&&0!=h)i=Object.assign(i,c[0].notes[s]),o&&2==h&&"sine"==i.type&&(i.isActive=!1),o&&1==h&&"triangle"==i.type&&(i.isActive=!1);else{let e;e=!l&&0<s&&r[s]==r[s-1]?(n.notes[n.notes.length-1].keyIndex+Math.round(2+fxrand()))%p.length:Math.round(m.map(fxrand(),0,1,0,p.length-1)),i.keyIndex=e,i.freq=m.midiToFreq(p[e]),i.start=r[s],i.end=0<s?r[s-1]:-1*(r[s]+1-r[y-1]),i.size=5,i.isActive=fxrand()>f[t%d],fxrand()>P[t]?i.type=i.start<.5?"sine":"triangle":i.type=fxrand()>w[t%d]?"sine":"triangle"}n.notes.push(i)}c.push(n)}window.$fxhashFeatures["Our Time Apart"]=g,window.$fxhashFeatures["Our Time Together"]=d-g;var s=fxrand();let n=1;l?window.$fxhashFeatures["Our Tempo"]="A Life Together":.98<s?(window.$fxhashFeatures["Our Tempo"]="Tornado",n=20):.9<s?(window.$fxhashFeatures["Our Tempo"]="Whilrwind",n=4):.7<s?(window.$fxhashFeatures["Our Tempo"]="Flurry",n=2):window.$fxhashFeatures["Our Tempo"]="A Life Together";for(let t=0;t<d;t++)c[t].plucks[0].movePerFrame*=n,c[t].plucks[1].movePerFrame*=n,c[t].speedMult=n;u&&.94<=fxrand()&&(s=.5<fxrand(),tune.plucks[0].isLow=s,tune.plucks[1].isLow=s)}const ourTuneApp=n=>{const s=[60,62,64,65,67,69,71,72];var e=["Red","Green","Teal","Purple"];const o=[],r=24,a=2,h=[],l=[],c=[];let d=30;let p=!1;let u=!1,i=!1,w=!0,f=!0,v,t,P=!1,y=0,m=0,g=!1,x=0,k=0,T=0,A=0,M=!1,O=0,I=0,b=[],F=n.color(0,0,0,100),S,C,_,N=n.getURLParams();window.$fxhashFeatures={"Our Tempo":"","Our Time Together":"","Our Time Apart":"","Our Tune Chapters":""};let z=0;for(let t=0;t<fxhash.length;t++)z+=fxhash.charCodeAt(t);var W=4502==z;for(let t=0;t<4;t++){var R=W?t:Math.floor(.99*fxrand()*4);o.push(R),window.$fxhashFeatures["Our Tune Chapters"]+=e[R],3!=t&&(window.$fxhashFeatures["Our Tune Chapters"]+=" -> ")}function L(t){var s=h[t].notes,n=s.length,e=h[t].plucks,o=e.length;for(let i=0;i<a;i++){for(let e=0;e<r;e++){let t=l[i][e];e<n&&i<o?(t.setCoreData(s[e]),t.reset()):t.d.isActive=!1}let t=c[i];t.controlPoint=void 0,t.controlNote=void 0,t.initData(e[i].id,e[i].direction,e[i].movePerFrame,e[i].isLow),t.setNotes(l[i])}}generateTunesFromHashV1(W,h,4,r,s,o,!1,n),console.log(window.$fxhashFeatures),n.pitaru_getTunesArray=function(){return h},n.pitaru_getPlucks=function(){return c},n.pitaru_getNotes=function(){return l},n.pitaru_getFPS=function(){return d},n.pitaru_getScaleArray=function(){return s},n.pitaru_getTuneCounter=function(){return x},n.pitaru_setFPS=function(t){d=t},n.pitaru_setAllowEvolveOnUserClick=function(t){i=t},n.pitaru_setAllowLockTuneOnUserHold=function(t){u=t},n.pitaru_setShowUnmuteUI=function(t){w=t},n.pitaru_setAllowResize=function(t,e){f=t,v=e,n.windowResized()},n.pitaru_loadTune=function(t){0<=t&&t<4&&j(t)},n.pitaru_stopTune=function(){g=!1},n.pitaru_startTune=function(){g=!0},n.setup=function(){n.getAudioContext().suspend(),_=new p5.Gain,_.amp(0),t=n.createCanvas(256,256),C=t.parent("app-holder"),t.canvas.id="app-canvas",w&&(S=n.createImg("./Mute_Icon.svg","sound muted"),S.style("width","25px"),S.style("height","25px")),n.windowResized(),n.frameRate(d),n.noSmooth(),n.colorMode(n.HSB,100),function(){for(let t=0;t<a;t++){c.push(new Pluck(n));let e=[];for(let t=0;t<r;t++)e.push(new D(t));l.push(e)}for(let e=0;e<360;e++){var i=Math.floor(e/90),s=(i+1)%4,i=o[i];let t=o[s];0==t&&0!=i&&(t=4);i=n.lerp(i,t,e/90%1)/4;b[e]=i}}(),x=N.startTune?Math.floor(N.startTune):0,0<=tuneIndexOnLoad&&tuneIndexOnLoad<4&&(x=tuneIndexOnLoad),L(x),I=n.TWO_PI/4*x,O=I,g=!0},n.draw=function(){n.fill(F),n.rect(0,0,n.width,n.height);if(O!=I&&Math.abs(O-I)<5e-4?O=I:O!=I&&(O+=(I-O)/20),n.push(),n.translate(n.width/2,n.height/2),n.rotate(O),n.translate(-n.width/2,-n.height/2),g){for(let e=0;e<c.length;e++){if(c[e].isActive=c[e].movePerFrame,45<y&&(c[e].ph-=c[e].direction*c[e].movePerFrame),c[e].ph<0||c[e].ph>n.height){c[e].ph<0&&(c[e].ph=n.height),c[e].ph>n.height&&(c[e].ph=0);for(let t=0;t<r;t++)l[e][t].reset();p||(k+=1/c[e].movePerFrame);let t=1;20==h[x].speedMult&&(t=5),4==h[x].speedMult&&(t=2),2==h[x].speedMult&&(t=2),!p&&m>=2*n.height/t&&j()}n.stroke(255,100),c[e].setStartEndPoints(new Point(0,c[e].ph),new Point(n.width,c[e].ph));for(let t=0;t<r;t++)l[e][t].update()}for(let t=0;t<r;t++)(l[0][t].playStartMillis>=l[1][t].playStartMillis?l[0]:l[1])[t].display();for(let t=0;t<c.length;t++)c[t].draw();y++,45<y&&m++}u&&M&&1e3<n.millis()-T&&(p=!p,M=!1);var t=Math.floor(O%n.TWO_PI/n.TWO_PI*360),e=n.color(100*b[t],100,100);let i=100;20==h[x].speedMult&&(i=5),4==h[x].speedMult&&(i=10),2==h[x].speedMult&&(i=22),F=n.color(100*b[t],100,0,i),n.push(),n.noFill(),n.stroke(e),p,n.pop(),n.push(),n.noStroke(),n.fill(e),n.rect(n.width,0,200,n.height),n.rect(-200,0,200,n.height),n.rect(0,-200,n.width,200),n.rect(0,n.height,n.width,200),n.pop(),n.pop(),1==y&&isFxpreview&&"function"==typeof fxpreview&&(fxpreview(),console.log("pitaru: fxpreview triggered"))};class D{constructor(t=0){this.noteArrayIndex=t,this.d={isActive:!1,type:"",size:0,freq:0,start:0,end:0,keyIndex:0},this.x=n.width/2,this.y=n.height/(r/(this.noteArrayIndex+1)),this.isStarted=!1,this.isCued=!1,this.isTraveling=!1,this.isAttached=!1,this.playStartMillis=0,this.cbTween=0,this.satTween=0,this.ch=0,this.cs=0,this.cb=0,this.ca=100,this.osc=new p5.Oscillator(this.d.type),this.envelope=new p5.Envelope,this.lowOctave=!1}setCoreData(t){this.d=Object.assign(this.d,t)}update(){this.noteGapMS=-1*(this.d.end-this.d.start)*1/d*n.height,this.soundEnvRelease=n.constrain(this.noteGapMS,1.2,2),this.totalPlayMS=1e3*(.7+this.soundEnvRelease);var t,e=200/(s.length-1)*this.d.keyIndex,i=n.width-(n.width/2+100-e);this.d.isActive?(this.x+=(i-this.x)/4,Math.abs(i-this.x)<1&&(this.x=i),t=this.d.start*n.height,this.y+=(t-this.y)/4,Math.abs(t-this.y)<1&&(this.y=t),this.isTraveling=!(i==this.x&&t==this.y),this.cbDest=this.isTraveling?50:100,this.cbTween+=(this.cbDest-this.cbTween)/4,Math.abs(this.cbDest-this.cbTween)<.5&&(this.cbTween=this.cbDest),t=this.isStarted?n.map(n.millis()-this.playStartMillis,0,this.totalPlayMS,100,0,!0):0,this.satTween+=(t-this.satTween)/(t<this.satTween?4:1),this.ch=e/200*100,this.cs=this.satTween,this.cb=this.cbTween,this.ca+=(100-this.ca)/10,99.8<this.ca&&(this.ca=100)):(this.ca+=(0-this.ca)/10,this.ca<.2&&(this.ca=0))}reset(){this.isStarted=!1,this.isCued=!1,this.isAttached=!1}play(e=!1){if(P){this.lowOctave=e;let t=this.d.freq;e&&(t/=2),this.osc.freq(t),this.osc.setType(this.d.type);e=O%n.TWO_PI;e>=0-n.TWO_PI/8&&e<n.TWO_PI/4-n.TWO_PI/8?this.osc.pan(this.x/n.width*2-1):e>=n.TWO_PI/4-n.TWO_PI/8&&e<n.TWO_PI/2-n.TWO_PI/8?this.osc.pan(1-this.y/n.height*2):e>=n.TWO_PI/2-n.TWO_PI/8&&e<n.TWO_PI/4*3-n.TWO_PI/8?this.osc.pan(1-this.x/n.width*2):e>=n.TWO_PI/4*3-n.TWO_PI/8&&e<n.TWO_PI-n.TWO_PI/8&&this.osc.pan(this.y/n.height*2-1);e=h[x].speedMult;1==e?"sine"==this.d.type?(this.envelope.setADSR(e<=2?.001:.01,.5,.2,this.soundEnvRelease),this.envelope.setRange(.5-.04*e,0)):"triangle"==this.d.type&&(this.envelope.setADSR(e<=2?.001:.01,.8*this.soundEnvRelease,.1,this.soundEnvRelease),this.envelope.setRange(.25-.022*e,0)):2==e?this.envelope.set(.001,"triangle"==this.d.type?.12:.288,"triangle"==this.d.type?.4:.5,.1,"triangle"==this.d.type?this.soundEnvRelease:1,0):4==e?this.envelope.set(.01,"triangle"==this.d.type?.12:.2,"triangle"==this.d.type?.4:.5,.1,1,0):20==e&&this.envelope.set(.01,"triangle"==this.d.type?.11:.2,.4,.1,.45,0),this.envelope.play(this.osc)}this.isStarted||(P&&(this.osc.start(),this.osc.stop(4)),this.isStarted=!0,this.isCued=!1,this.isAttached=!1,this.playStartMillis=n.millis())}display(){var t;0!=this.ca&&(n.noStroke(),n.fill(this.ch,this.cs,this.cb,this.ca),"sine"==this.d.type?n.ellipse(Math.round(this.x),Math.round(this.y),this.d.size,this.d.size):"triangle"==this.d.type&&(t=this.d.size/2*.75,n.push(),n.rectMode(n.RADIUS),n.translate(this.x,this.y),n.rotate(n.PI/4),n.translate(-this.x,-this.y),n.rect(Math.round(this.x),Math.round(this.y),t,t),n.pop()))}}function j(t=!0,e=-1){0<=e&&e<4?x=e:(x++,x%=4),L(x),k=0,m=0,t&&(I+=n.TWO_PI/4);for(let t=0;t<c.length;t++)c[t].ph=0;"function"==typeof n.pitaru_evolve&&n.pitaru_evolve(x)}n.mousePressed=function(t){T=n.millis(),M=!0},n.mouseReleased=function(t){if(M){if(M=!1,n.millis()-A<100)return!0;A=n.millis(),P?n.millis()-T<2e3&&i&&j():(n.userStartAudio(),P=!0,w&&S.style("display","none"))}},n.windowResized=function(){f,t.position(n.windowWidth/2-+t.width/2,n.windowHeight/2-+t.height/2),w&&!P&&S.position(n.windowWidth/2-+t.width/2+14,n.windowHeight/2-+t.height/2+12)}},navApp=e=>{let n,o,i,r="";let a=!1;e.setup=function(){e.noCanvas();var t=e.color(0,150);o=e.createDiv("Hello"),o.id="nav-div",o.style("background-color",t),o.style("padding-left","10px"),o.style("padding-top","2px"),o.position(0,0),t=e.color(255,100),n=e.createButton("SYNC"),n.hide(),n.style("background-color",t),n.style("color","white"),n.style("font-family","verdana"),n.mousePressed(doSync),n.size(100,24),n.style("border-radius","4px"),n.style("border","1px"),i=e.createSelect(),i.size(150,24),i.style("text-align","center"),i.style("background-color",t),i.style("color","white"),i.style("font-family","verdana"),i.style("border-radius","4px"),i.style("border","0px"),i.option("Playground"),i.option("Wingspan"),i.option("None"),i.disable("Playground"),i.changed(e.vizSelectorChanged),e.windowResized()},e.update=function(e,i,t){if(a){let t=e[r-1];var s=t.owner.name||t.owner.id.substring(0,5)+"..."+t.owner.id.substring(t.owner.id.length-5),s=(t.iteration,t.iteration,'<a href="https://www.fxhash.xyz/gentk/slug/our-tune-'+t.iteration+'" target="_blank">'+s+"</a>");o.html("←Drag→ to select: <a>Our Tune #"+r+"</a> |  collected by "+s)}else{let t=e[i];e=t.owner.name||t.owner.id.substring(0,5)+"..."+t.owner.id.substring(t.owner.id.length-5),i='<a href="https://www.fxhash.xyz/gentk/slug/our-tune-'+t.iteration+'" target="_blank">Our Tune #'+t.iteration+"</a>",e='<a href="https://www.fxhash.xyz/gentk/slug/our-tune-'+t.iteration+'" target="_blank">'+e+"</a>";o.html("Playing "+i+" |  collected by "+e)}""==t?(n.html("SYNC"),n.mousePressed(doSync)):(n.html("UNSYNC"),n.mousePressed(doUnsync))},e.draw=function(){},e.vizSelectorChanged=function(t){var e=i.value();"None"==e?(viz.remove(),app.remove(),app=new p5(ourTuneApp)):"Wingspan"==e&&(viz.remove(),app.remove(),app=new p5(ourTuneApp),viz=new p5(vizAppV2))},e.windowResized=function(){e.resizeCanvas(e.windowWidth,e.windowHeight),w=e.windowWidth,h=e.windowHeight,o.size(w-n.width-i.width,24),n.position(w-n.width,0),i.position(w-n.width-i.width-5,0)},e.mouseDragged=function(){isPressed&&(r=e.constrain(Math.round(e.mouseX/e.width*ownerObjs.length),1,ownerObjs.length),a=!0,update())},e.mousePressed=function(){e.mouseY<30||(isPressed=!0,a=!0,r=tuneToShow+1,update())},e.mouseReleased=function(){a&&isPressed&&(a=!1,isPressed=!1,update(),console.log(tuneToShow,r),tuneToShow!=r-1&&(tuneToShow=r-1,startEngines()))}},vizAppV2=s=>{let n=512,o=512,t,i=[],r=0;s.setup=function(){cnv=s.createCanvas(n,o),t=cnv.parent("app-viz-holder"),cnv.canvas.id="app-viz-canvas",s.frameRate(30),s.noSmooth(),s.colorMode(s.HSB,100);s.color(100,0,100,100);app.pitaru_playNote=function(t,e){doPlay(t,e)},app.pitaru_evolve=function(t){r+=s.PI/2;for(let t=0;t<i.length;t++)delete i[t];i.length=[]},s.background(0),s.windowResized()},doPlay=function(t,e){i.push(new a(t,e))},s.draw=function(){for(let t=0;t<i.length;t++)i[t].draw()},s.windowResized=function(){n=s.windowWidth,o=s.windowHeight,s.resizeCanvas(n,o)};class a{constructor(t,e){this.n=t,this.isLow=this.n.lowOctave,this.p=e,this.y1=this.p.ph+o/2-128,this.x1=n/2+128,this.yLen=0<this.p.direction?-o:o,this.frameCounter=0,this.totalPlayFrames=this.n.totalPlayMS/30}draw(){var t,e,i;this.frameCounter,this.totalPlayFrames;this.frameCounter<=this.totalPlayFrames&&(t=.25*this.yLen*(10-this.n.cs/10+.1),e=this.frameCounter/100*n*(6*(1-this.n.cs/100)),s.strokeWeight(this.n.lowOctave?3:1),s.push(),s.translate(n/2,o/2),s.rotate(r),s.translate(-n/2,-o/2),i=2*this.p.movePerFrame,i=s.color(this.n.ch,s.map(this.n.cs,0,100,80,100,!0),this.n.cb,s.map(this.n.cs,0,100,0,this.n.lowOctave?5*i:10*i,!0)),s.stroke(i),s.line(this.x1,this.y1,this.x1+e,this.y1-t),s.noStroke(),s.fill(i),"sine"==this.n.d.type?s.ellipse(this.x1+e,this.y1-t,4,4):"triangle"==this.n.d.type&&(s.push(),s.rectMode(s.RADIUS),s.translate(this.x1+e,this.y1-t),s.rotate(s.PI/4),s.translate(-(this.x1+e),-(this.y1-t)),s.rect(this.x1+e,this.y1-t,2,2),s.pop()),s.pop(),this.frameCounter++)}}};let objkts,fxh,tuneIndexOnLoad,ownerObjs=[],app,viz,nav=new p5(navApp),ownerId="",params=new URL(document.location).searchParams,tuneIdParam=params.get("tuneId"),tuneToShow=tuneIdParam?tuneIdParam-1:0;doFetch();const dAppClient=new beacon.DAppClient({name:"Beacon Docs"}),doUnsync=async function(){await dAppClient.clearActiveAccount(),await dAppClient.getActiveAccount();ownerId="",update()};function update(){nav.update(ownerObjs,tuneToShow,ownerId)}const doSync=async function(){var t=await dAppClient.getActiveAccount();ownerId=t?(console.log("Already connected:",t.address),t.address):(t=await dAppClient.requestPermissions(),console.log("New connection:",t.address),t.address),update()};function startEngines(){ownerObjs=objkts;var t=ownerObjs[tuneToShow];fxh=t.generationHash,bootFXHash(fxh),tuneIndexOnLoad=0,update(),app&&(console.log("removing children"),viz.remove(),app.remove()),app=new p5(ourTuneApp),viz=new p5(vizAppV2),window.history.replaceState(null,null,"?tuneId="+Math.round(tuneToShow+1));new URLSearchParams(window.location.search)}function doFetch(){fetch("https://api.fxhash.xyz/graphql",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
    {
      generativeToken(id:6385) {
        id,
        entireCollection {
          id,
          name,
          slug,
          generationHash,
          rarity,
          iteration,
          metadata,
          offer {
            id,
            price,
            issuer {
              id,
              name
            }
          },
          owner {
            id,
            name,
            avatarUri
          }
        }
      }
    }
    `})}).then(t=>t.json()).then(t=>{ownerObjs=[],objkts=t.data.generativeToken.entireCollection,objkts.reverse(),startEngines()})}