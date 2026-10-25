// An original, lightweight story system. It does not simulate cartridge battle rules.
export const scenes = [
 {place:'Littleroot Town',title:'A light that shouldn’t be there.',text:'The power is out in Littleroot. Beyond your window, a blue light pulses from the coast. Mudkip taps the glass with one determined little foot. On the doorstep: a soaked envelope addressed to Wednesday.',choices:[
  {label:'Read the envelope before setting out.',hint:'Follow the mystery · +1 clue',effect:{clues:1},result:'“The tide is coming in from the wrong direction.” A hand-drawn lighthouse marks the end of Route 104.'},
  {label:'Check on your neighbors first.',hint:'Take care of the town · +1 kindness',effect:{care:1},result:'Your neighbor lends you a lantern. Mudkip’s whole face lights up when the flame catches.'},
  {label:'Follow Mudkip straight toward the light.',hint:'Trust your partner · +1 courage',effect:{courage:1},result:'Mudkip bounds ahead. At the edge of town, you stop to make sure you have a way back. Then: onward.'}]},
 {place:'Route 102',title:'Something rustles in the grass.',text:'A frightened Zigzagoon blocks the path. A broken blue ribbon is caught around its paw. The distant pulse grows brighter, and Mudkip waits for your signal.',choices:[
  {label:'Kneel down and untangle the ribbon.',hint:'A patient approach · +1 kindness, −3 HP',effect:{care:1,hp:-3},result:'It takes a little scuffle, but the ribbon comes free. Zigzagoon leaves you a very dignified thank-you squeak.'},
  {label:'Have Mudkip distract it while you slip past.',hint:'Move with confidence · +1 courage, −5 HP',effect:{courage:1,hp:-5},result:'Mudkip draws it away from the trail. A muddy tumble costs a little energy, but the coast is clear.'},
  {label:'Look closely at the ribbon’s markings.',hint:'Investigate · +1 clue, −2 HP',effect:{clues:1,hp:-2},result:'The ribbon bears the lighthouse keeper’s insignia. This little traveler has come a long way.'}]},
 {place:'Petalburg Outskirts',title:'The last shop with a light on.',text:'A shopkeeper has stayed late for travelers caught in the blackout. You have ₽500 and one field potion. The road ahead will be rougher. Somewhere outside, rain begins to tick against the shutters.',choices:[
  {label:'Buy a field potion for ₽200.',hint:'One extra potion · costs ₽200',effect:{money:-200,potions:1},result:'You tuck the potion safely into your bag. One less thing to worry about.'},
  {label:'Help the shopkeeper secure the shutters.',hint:'Earn a warm meal · +1 kindness, +6 HP',effect:{care:1,hp:6},result:'A shared bowl of stew and a dry towel make the night feel much less enormous.'},
  {label:'Ask what happened at the lighthouse.',hint:'Listen for the detail everyone missed · +1 clue',effect:{clues:1},result:'“The keeper went to repair the lens,” she says. “But the light came on before he got there.”'}]},
 {place:'Petalburg Woods',title:'The long way is still a way.',text:'Rain has washed out the footbridge. On the other bank, a pair of lanterns signals for help. Mudkip tests the current with one paw, then looks back at you.',choices:[
  {label:'Cross together using the fallen branches.',hint:'A daring crossing · +1 courage, −8 HP',effect:{courage:1,hp:-8},result:'You go one branch at a time. Mudkip refuses to let you lose your footing. Together, you reach the far bank.'},
  {label:'Search upstream for a safer crossing.',hint:'Careful navigation · +1 clue, −3 HP',effect:{clues:1,hp:-3},result:'An old stone crossing hides under the ivy. There are fresh bootprints on its far side.'},
  {label:'Signal the stranded travelers and guide them around.',hint:'Nobody left behind · +1 kindness, −4 HP',effect:{care:1,hp:-4},result:'You make the crossing as a group. The smallest traveler solemnly declares Mudkip the captain.'}]},
 {place:'Route 104 Coast',title:'A moment before the storm.',text:'The lighthouse stands on a dark headland. Its beam sweeps backward across the clouds. Mudkip is quiet now. You sit together on a salt-worn bench and decide how to prepare.',choices:[
  {label:'Give Mudkip a field potion.',hint:'Use 1 potion · restore up to 18 HP',effect:{potions:-1,hp:18},result:'Mudkip shakes off the rain and gives a tiny, defiant chirp. Ready.'},
  {label:'Rest together beneath the old shelter.',hint:'Take a breather · +8 HP',effect:{hp:8},result:'For a few minutes, there is only rain on the roof and the reassuring weight of your partner beside you.'},
  {label:'Study the strange rhythm of the beam.',hint:'Find a pattern · +1 clue',effect:{clues:1},result:'Three short flashes. One long. The beam is sending a message, not searching the sea.'}]},
 {place:'The Old Lighthouse',title:'Not a monster. A mistake.',text:'The keeper is trapped behind a jammed maintenance door. His new signal lens has overloaded in the storm. Outside, a vast shape moves beneath the waves. The light is calling something that was meant to sleep.',choices:[
  {label:'Brace the door while Mudkip pushes through.',hint:'Make your own opening · +1 courage, −7 HP',effect:{courage:1,hp:-7},result:'The door gives with a groan. The keeper is shaken, but safe. He presses a brass key into your hand.'},
  {label:'Trace the emergency latch from the diagram.',hint:'Understand the machinery · +1 clue, −2 HP',effect:{clues:1,hp:-2},result:'A red cable leads to a hidden latch. The door clicks open. The keeper smiles like he has seen the sun.'},
  {label:'Talk the keeper through releasing it from inside.',hint:'Keep someone steady · +1 kindness, −3 HP',effect:{care:1,hp:-3},result:'You keep talking until his hands stop shaking. Together, you count down and turn the latch.'}]},
 {place:'The Lantern Room',title:'The sea answers.',text:'A blue silhouette rises beyond the glass. Kyogre. Every wave seems to hold its breath. The lens spins faster, and the keeper points to three ways of shutting it down. Mudkip stands beside your boot.',choices:[
  {label:'Shield Mudkip and pull the main breaker.',hint:'Be brave together · +2 courage, −9 HP',effect:{courage:2,hp:-9},result:'The switch fights you. Then it gives. The beam dies, and Mudkip catches your sleeve as you stumble.'},
  {label:'Reverse the signal using your observations.',hint:'Solve the pattern · +2 clues, −4 HP',effect:{clues:2,hp:-4},result:'You match the pulse to the sea’s rhythm, then gently let it fade. The great shape pauses, listening.'},
  {label:'Keep the room calm while the keeper disables the lens.',hint:'Trust the people beside you · +2 kindness, −5 HP',effect:{care:2,hp:-5},result:'You steady the keeper; Mudkip steadies you. The light narrows to a thread, then disappears.'}]},
 {place:'Route 104 at Dawn',title:'The world gets its morning back.',text:'The storm loosens its grip. Far offshore, the blue silhouette sinks quietly beneath the surface. Nobody has caught a legend tonight. But everyone has made it home.',choices:[
  {label:'Walk the keeper home before heading to Littleroot.',hint:'Finish with kindness · +1 kindness',effect:{care:1},result:'He insists on making breakfast. Mudkip receives a portion completely out of proportion to its size.'},
  {label:'Write down everything you saw.',hint:'Keep the wonder · +1 clue',effect:{clues:1},result:'Some things deserve to be remembered accurately. Others deserve a whole page just for how they felt.'},
  {label:'Take the scenic route home with Mudkip.',hint:'A new road awaits · +1 courage',effect:{courage:1},result:'At the next fork, Mudkip picks the road with the puddles. You do not argue.'}]}
];
export function freshState(){return {version:1,step:0,hp:30,money:500,potions:1,courage:0,care:0,clues:0,history:[]};}
export function validState(s){
 if(!s||typeof s!=='object'||Array.isArray(s)||s.version!==1)return false;
 const bounds={step:[0,scenes.length],hp:[1,30],money:[0,999999],potions:[0,99],courage:[0,20],care:[0,20],clues:[0,20]};
 for(const [key,[min,max]] of Object.entries(bounds))if(!Number.isInteger(s[key])||s[key]<min||s[key]>max)return false;
 return Array.isArray(s.history)&&s.history.length===s.step&&s.history.every((h,i)=>h&&h.step===i&&Number.isInteger(h.choice)&&h.choice>=0&&h.choice<3&&typeof h.result==='string'&&h.result.length<=1200);
}
export function choose(state,index){
 if(!validState(state))throw new Error('Invalid story save.');
 if(state.step>=scenes.length||!Number.isInteger(index)||index<0||index>2)throw new Error('That choice is unavailable.');
 const choice=scenes[state.step].choices[index];
 if(choice.effect.money&&state.money+choice.effect.money<0)throw new Error('Not enough money for this choice.');
 if(choice.effect.potions&&state.potions+choice.effect.potions<0)throw new Error('No field potions left. Try resting instead.');
 const next=structuredClone(state);
 for(const [key,value] of Object.entries(choice.effect))next[key]+=value;
 let result=choice.result;
 if(next.hp<=0){next.hp=15;const bill=Math.min(next.money,100);next.money-=bill;result+=` The effort is too much. The keeper calls for help; after a rest and ₽${bill} in supplies, Mudkip recovers to 15 HP.`;}
 next.hp=Math.min(30,next.hp);
 for(const [key,max]of Object.entries({money:999999,potions:99,courage:20,care:20,clues:20}))next[key]=Math.min(max,next[key]);
 next.history.push({step:state.step,choice:index,result});next.step++;
 return next;
}
export function ending(s){
 const key=s.clues>=s.courage&&s.clues>=s.care?'clues':s.care>=s.courage?'care':'courage';
 return {clues:{title:'The one who listened.',text:'You found the story inside the signal. By the time the sun rises, your notebook is full and the lighthouse is quiet. A mystery solved, a partner beside you, and a whole region still to discover.'},care:{title:'The one who brought everyone home.',text:'The keeper will remember your kindness long after the lamp is repaired. The travelers will remember their tiny captain. You and Mudkip return to Littleroot knowing that a good adventure leaves the world a little gentler.'},courage:{title:'The one who took the first step.',text:'You did not know what waited at the end of the road. You went anyway, and you went together. Mudkip falls asleep against your backpack as the morning turns the wet road gold.'}}[key];
}
