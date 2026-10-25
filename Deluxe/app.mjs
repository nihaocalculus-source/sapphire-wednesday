import {scenes,freshState,validState,choose,ending} from './story.mjs';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const titles={arcade:'THE ARCADE',adventure:'STORY MODE',journal:'ADVENTURE LOG',guide:'FIELD GUIDE'};
let toastTimer, started=false, activeGame=null, launchTrigger=null;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),5000);}
function view(name,focus=true){if(!titles[name])name='arcade';$$('.view').forEach(e=>e.hidden=e.id!==name);$$('.nav').forEach(e=>{e.classList.toggle('active',e.dataset.view===name);if(e.dataset.view===name)e.setAttribute('aria-current','page');else e.removeAttribute('aria-current');});$('#crumb').textContent=titles[name];history.replaceState(null,'','#'+name);if(focus){$('#main').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));
window.addEventListener('hashchange',()=>view(location.hash.slice(1)));
view(location.hash.slice(1)||'arcade',false);
let confirmation=null;
function confirmAction(title,message,ok='Continue',cancel='Cancel'){
 if(confirmation)return Promise.resolve(false);
 $('#confirm-title').textContent=title;$('#confirm-text').textContent=message;$('#confirm-ok').textContent=ok;$('#confirm-cancel').textContent=cancel;
 $('#confirm-modal').showModal();$('#confirm-cancel').focus();
 return new Promise(resolve=>confirmation=resolve);
}
function resolveConfirmation(value){$('#confirm-modal').close();const resolve=confirmation;confirmation=null;resolve?.(value);}
$('#confirm-ok').addEventListener('click',()=>resolveConfirmation(true));$('#confirm-cancel').addEventListener('click',()=>resolveConfirmation(false));$('#confirm-modal').addEventListener('cancel',e=>{e.preventDefault();resolveConfirmation(false);});
let roms={sapphire:false,ruby:false};
$$('[data-play]').forEach(b=>{b.disabled=true;b.addEventListener('click',()=>{
 const game=b.dataset.play;if(!roms[game])return;
 launchTrigger=b;activeGame=game;started=false;
 $('#player-title').textContent='Pokémon '+(game==='ruby'?'Ruby':'Sapphire');
 const frame=document.createElement('iframe');frame.src='player.html?game='+game;frame.title=$('#player-title').textContent+' emulator';frame.allow='autoplay; fullscreen; gamepad';frame.allowFullscreen=true;
 $('#player-frame').replaceChildren(frame);$('#player-modal').showModal();
 });});
async function closePlayer(){
 if(started&&!await confirmAction('Ready to leave Hoenn?','Save through the game’s own menu or export a save state from the emulator toolbar before closing. Unsaved progress may be lost.','Close player','Keep playing'))return;
 $('#player-modal').close();$('#player-frame').replaceChildren();started=false;activeGame=null;launchTrigger?.focus();
}
$('#close-player').addEventListener('click',closePlayer);$('#player-modal').addEventListener('cancel',e=>{e.preventDefault();closePlayer();});
window.addEventListener('beforeunload',e=>{if(started){e.preventDefault();e.returnValue='';}});
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==$('#player-frame iframe')?.contentWindow||e.data?.game!==activeGame)return;if(e.data.type==='game-started')started=true;if(e.data.type==='game-saved')toast('Save action completed. Keep a downloaded backup of your progress.');});
async function checkGames(){
 try{const r=await fetch('/api/health');if(!r.ok)throw Error();const health=await r.json();if(health.app!=='sapphire-wednesday-deluxe')throw Error();roms=health.games;
  for(const g of ['sapphire','ruby']){$$(`[data-play="${g}"]`).forEach(b=>b.disabled=!roms[g]);$(`[data-rom-status="${g}"]`).textContent=roms[g]?'Ready to play':'ROM missing';}
  $('#system-status').textContent=roms.ruby&&roms.sapphire?'● ALL SYSTEMS READY':'CARTRIDGE MISSING';
 }catch{$('#system-status').textContent='LAUNCHER NEEDED';$$('[data-rom-status]').forEach(e=>e.textContent='Open the launcher');toast('Double-click Launch Sapphire Wednesday.command to start the local hub.');}
}
checkGames();
const SAVE_KEY='sapphire-wednesday-story-v1';let story=freshState(),persistent=true;
try{const raw=localStorage.getItem(SAVE_KEY);if(raw){const parsed=JSON.parse(raw);if(!validState(parsed))throw Error();story=parsed;}}
catch{toast('The story save could not be read. A fresh session is open; the old stored file has not been changed.');persistent=false;}
function saveStory(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(story));persistent=true;}catch{persistent=false;}$('#story-save-note').textContent=persistent?'Autosaved in this browser.':'Browser saving unavailable. Export your story save.';}
function renderStory(){
 const finished=story.step===scenes.length;const scene=finished?null:scenes[story.step];
 $('#story-location').textContent=scene?.place||'Littleroot Town · Dawn';$('#story-step').textContent=finished?'STORY COMPLETE':`${String(story.step+1).padStart(2,'0')} / 08`;
 $('#story-kicker').textContent=finished?'THE TIDE AFTER MIDNIGHT / YOUR ENDING':'CHAPTER '+(story.step+1);
 $('#story-title').textContent=finished?ending(story).title:scene.title;$('#story-text').textContent=finished?ending(story).text:scene.text;
 $('#story-feedback').textContent=story.history.at(-1)?.result||'';$('#choices').replaceChildren();
 if(scene)scene.choices.forEach((c,i)=>{const button=document.createElement('button');button.className='choice';const n=document.createElement('b');n.textContent=i+1;const label=document.createElement('span');label.textContent=c.label;const hint=document.createElement('small');hint.textContent=c.hint;label.append(hint);button.append(n,label);button.disabled=!!((c.effect.potions<0&&story.potions<1)||(c.effect.money<0&&story.money<-c.effect.money));button.addEventListener('click',()=>{try{story=choose(story,i);saveStory();renderStory();$('#story-title').tabIndex=-1;$('#story-title').focus({preventScroll:true});}catch(e){toast(e.message);}});$('#choices').append(button);});
 else{const p=document.createElement('p');p.className='save-note';p.textContent='Your ending is saved. Export it to keep, or start again to explore another path.';$('#choices').append(p);}
 $('#story-stats').replaceChildren();
 for(const [label,value] of [['Mudkip HP',`${story.hp} / 30`],['Travel money',`₽${story.money.toLocaleString()}`],['Field potions',story.potions],['Courage',story.courage],['Kindness',story.care],['Clues',story.clues]]){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);$('#story-stats').append(row);}
 $('#story-save-note').textContent=persistent?'Autosaved in this browser.':'Export your story save to keep this session.';
}
function download(name,text,type='application/json'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}
$('#export-story').addEventListener('click',()=>{download('wednesday-story-save.json',JSON.stringify(story,null,2));toast('Story save exported. Keep it somewhere safe.');});
$('#import-story').addEventListener('change',async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;try{if(file.size>131072)throw Error('Save file is too large. Choose a story JSON export.');const parsed=JSON.parse(await file.text());if(!validState(parsed))throw Error('This is not a compatible Wednesday story save. GBA saves belong in the emulator.');if(!await confirmAction('Load this story save?','This replaces the current story in this browser. Export your current story first if you want to keep it.','Load story'))return;story=parsed;saveStory();renderStory();toast('Your story is back.');}catch(err){toast(err instanceof SyntaxError?'The file is not valid JSON. Choose an exported story save.':err.message);}});
$('#reset-story').addEventListener('click',async()=>{if(!await confirmAction('A new beginning?','This starts the eight-chapter story over. Export your current story first if you want to keep it.','Start again'))return;story=freshState();saveStory();renderStory();});
$('#copy-prompt').addEventListener('click',async()=>{try{const r=await fetch('docs/pokemon-engine-deluxe.md');if(!r.ok)throw Error();const text=await r.text();await navigator.clipboard.writeText(text);toast('Deluxe prompt copied. Paste it into a new chat.');}catch{toast('Clipboard unavailable. Use the prompt download link below.');}});
renderStory();
const party=[['swampert','Swampert',56],['gardevoir','Gardevoir',52],['breloom','Breloom',51],['manectric','Manectric',51],['swellow','Swellow',50],['lairon','Lairon',42]];
for(const [slug,name,level]of party){const card=document.createElement('article');card.className='party-member';card.innerHTML=`<img src="assets/${slug}.png" alt="${name}"><h3>${name}</h3><p>LEVEL ${level}</p>`;$('#party').append(card);}
const chapters=[
 ['Littleroot & Route 101','A cry from the tall grass, a borrowed Poké Ball, and a Mudkip who decides Wednesday is worth following. The best journeys start with helping someone.'],
 ['Petalburg Woods','A shy Ralts, an impatient Taillow, and a Shroomish who refuses to be hurried. The party becomes a collection of personalities, not just a list of names.'],
 ['Roxanne & the Stone Badge','Rustboro asks its first serious question: are you paying attention? Mudkip answers with Water Gun. Wednesday learns that preparation feels a lot like confidence.'],
 ['Dewford & the Knuckle Badge','The sea crossing is quiet. The Gym is not. Taillow finds its wings, and a letter reaches Steven in Granite Cave.'],
 ['Mauville & the Dynamo Badge','The route fills with rivals and bright city noise. Marshtomp holds its ground while Electrike discovers that it belongs with the team.'],
 ['Mt. Chimney & the Heat Badge','Trouble gathers above the clouds. Wednesday’s Sapphire telling follows Team Aqua into the summit conflict before the road turns toward Lavaridge.'],
 ['Norman & the Balance Badge','The hardest battle is the one against someone who already believes in you. Wednesday learns the rhythm of Truant and earns the right to Surf.'],
 ['Fortree & the Feather Badge','Rain on the canopy, bridges above the leaves, and a Gym that refuses to stay grounded. Manectric makes its presence known.'],
 ['Mt. Pyre & the Mind Badge','An orb vanishes. The sea darkens. At Mossdeep, Swampert’s strength meets a battle that asks two partners to act as one.'],
 ['Seafloor Cavern','Down where the light runs out, Archie mistakes conviction for wisdom. The team wins a battle. The weather still breaks.'],
 ['The Cave of Origin','Wednesday enters a cavern full of rain and ancient echoes. The story gives Kyogre a place in the PC, while the original six keep their place on the road.'],
 ['Wallace & the Rain Badge','Sootopolis emerges from the storm. One more badge remains, and no single partner can earn it alone.'],
 ['The League & the Hall of Fame','Victory Road gives way to five final doors. By the last Earthquake, the adventure has become something larger than the promise that started it.']
];
chapters.forEach(([title,text],i)=>{const d=document.createElement('details');d.className='chapter';d.innerHTML=`<summary><span>${String(i+1).padStart(2,'0')}</span>${title}</summary><p>${text}</p>`;$('#chapters').append(d);});
