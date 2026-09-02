let hasRedirected = false;
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent);
}

const minRT = 250;
const maxRT = 10000;

const respondentIsMobile = isMobileDevice();


console.log(respondentIsMobile)

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const rdud =
  getQueryParam("rdud") ||
  getQueryParam("rid") ||
  getQueryParam("id") ||
  "UNKNOWN";

const jsPsych = initJsPsych({
  show_progress_bar: true
});
//   {
//   on_finish: function () {
//     // jsPsych.data.get().localSave('csv', 'miat_results.csv');
//     const allData = jsPsych.data.get().values();
//     database
//       .ref(`miat_results/${survey_name}`)
//       .push(allData)
//       .then(() => console.log('✅ Written to Firebase'))
//       .catch(e => console.error('❌ Firebase error', e));
//   }
// });

jsPsych.data.addProperties({  rdud: rdud, mobile: respondentIsMobile });



const respondent_id = jsPsych.randomization.randomID(10);
const timeline = [];

const mobileBreakerTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker';
  }
};


///--------------------------------------------------ATTENTION QUESTIONS--------------------------------------------------------------------------------------------------
///-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const attentionCheck1 = {
  timeline: [
    ...(respondentIsMobile ? [mobileBreakerTrial] : []), // BEFORE

    {
      type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
      stimulus: () => {
        return `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
            <p style="font-size:3rem; text-align:center; font-weight:bold;">Quanto é 3 × 2?</p>
            ${
              respondentIsMobile 
                ? ''
                : `
                  <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
                    <div style="background:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:200px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                      <div style="font-weight:bold;">[E]</div>
                      <div style="font-size:2rem; font-weight:bold;">6</div>
                    </div>
                    <div style="background:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:200px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                      <div style="font-weight:bold;">[I]</div>
                      <div style="font-size:2rem; font-weight:bold;">9</div>
                    </div>
                  </div>
                `
            }
          </div>
        `;
      },
      choices: respondentIsMobile ? ['6', '9'] : ['e','i'],
      button_html: respondentIsMobile
        ? (choice, index) => `
          <button style="
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            font-weight: 600;
            padding: 2vh 2vw;
            border-radius: 1vw;
            border: none;
            margin: 1vh;
            background-color: ${index === 0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            width: 60vw;
            max-width: 350px;
          ">${choice}</button>`
        : undefined,
      data: {
        part: "attention_check",
        question: "3 × 2",
        correct_answer: "6"
      },
      on_finish: function(data) {
        if (respondentIsMobile) {
          const opts = ['6','9'];
          data.user_answer = (data.response !== null) ? opts[data.response] : null;
        } else {
          const keyToAnswer = { e: '6', i: '9' };
          data.user_answer = keyToAnswer[data.response];
        }
        data.accurate = (data.user_answer === data.correct_answer);
      }
    },

    ...(respondentIsMobile ? [mobileBreakerTrial] : []) // AFTER
  ]
};
const attentionCheck2 = {
  timeline: [
    ...(respondentIsMobile ? [mobileBreakerTrial] : []), // BEFORE

    {
      type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
      stimulus: () => {
        return `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
            <p style="font-size:3rem; text-align:center; font-weight:bold;">Quanto é 11 menos 3?</p>
            ${
              respondentIsMobile 
                ? ''
                : `
                  <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
                    <div style="background:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:200px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                      <div style="font-weight:bold;">[E]</div>
                      <div style="font-size:2rem; font-weight:bold;">6</div>
                    </div>
                    <div style="background:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:200px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                      <div style="font-weight:bold;">[I]</div>
                      <div style="font-size:2rem; font-weight:bold;">8</div>
                    </div>
                  </div>
                `
            }
          </div>
        `;
      },
      choices: respondentIsMobile ? ['5', '8'] : ['e','i'],
      button_html: respondentIsMobile
        ? (choice, index) => `
          <button style="
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            font-weight: 600;
            padding: 2vh 2vw;
            border-radius: 1vw;
            border: none;
            margin: 1vh;
            background-color: ${index === 0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            width: 60vw;
            max-width: 350px;
          ">${choice}</button>`
        : undefined,
      data: {
        part: "attention_check",
        question: "11 - 3",
        correct_answer: "8"
      },
      on_finish: function(data) {
        if (respondentIsMobile) {
          const opts = ['5','8'];
          data.user_answer = (data.response !== null) ? opts[data.response] : null;
        } else {
          const keyToAnswer = { e: '6', i: '8' };
          data.user_answer = keyToAnswer[data.response];
        }
        data.accurate = (data.user_answer === data.correct_answer);
      }
    },

    ...(respondentIsMobile ? [mobileBreakerTrial] : []) // AFTER
  ]
};


const attentionCheck3 = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,

  stimulus: () => `
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
      <p style="font-size:3rem; text-align:center; font-weight:bold; margin-bottom:4vh;">Quanto é 5 mais 7?</p>
      
      ${
        respondentIsMobile
          ? '' // mobile buttons handled separately
          : `
        <div style="
          display:grid; 
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 40px; 
          justify-items:center;
          max-width:900px;
          width:100%;
          margin:0 auto;
        ">
          <div style="background:rgb(32,150,11); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
            <div style="font-weight:bold; margin-bottom:8px;">[A]</div>
            <div style="font-size:1.8rem; font-weight:bold;">10</div>
          </div>
          <div style="background:rgb(60,145,237); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
            <div style="font-weight:bold; margin-bottom:8px;">[S]</div>
            <div style="font-size:1.8rem; font-weight:bold;">11</div>
          </div>
          <div style="background:rgb(237,80,80); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
            <div style="font-weight:bold; margin-bottom:8px;">[K]</div>
            <div style="font-size:1.8rem; font-weight:bold;">12</div>
          </div>
          <div style="background:rgb(236,221,57); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
            <div style="font-weight:bold; margin-bottom:8px;">[L]</div>
            <div style="font-size:1.8rem; font-weight:bold;">13</div>
          </div>
        </div>
      `}
    </div>
  `,

  // Choices = labels for buttons or keypresses
  choices: respondentIsMobile
    ? ['10', '11', '12', '13']
    : ['a','s','k','l'],

  // Mobile button renderer
  button_html: respondentIsMobile
    ? (choice, index) => {
        const colors = [
          "rgb(32,150,11)",   // green
          "rgb(60,145,237)",  // blue
          "rgb(237,80,80)",   // red
          "rgb(236,221,57)"   // yellow
        ];
        return `
          <button style="
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            font-weight: 600;
            padding: 2vh 2vw;
            border-radius: 1vw;
            border: none;
            margin: 1vh;
            background-color: ${colors[index]};
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            width: 40vw;
          ">${choice}</button>`;
      }
    : undefined,

  data: {
    part: "attention_check",
    question: "5+7",
    correct_answer: "12"
  },

  on_finish: function(data){
  if (respondentIsMobile){
    // Fallback to trial definition choices
    const trialChoices = ['10', '11', '12', '13'];
    if (data.response !== null && data.response < trialChoices.length) {
      data.user_answer = trialChoices[data.response];
    } else {
      data.user_answer = null;
    }
  } else {
    const keyToAnswer = { 'a': '10', 's': '11', 'k': '12', 'l': '13' };
    data.user_answer = keyToAnswer[data.response] || null;
  }

  data.accurate = (data.user_answer === data.correct_answer);
}
};



const attentionCheck4 = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    return `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
        <p style="font-size:3rem; text-align:center; font-weight:bold; margin-bottom:4vh;">Quanto é 4 × 6?</p>
        
        ${respondentIsMobile ? '' : `
          <div style="
            display:grid; 
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 40px; 
            justify-items:center;
            max-width:900px;
            width:100%;
            margin:0 auto;
          ">
            <div style="background:rgb(32,150,11); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
              <div style="font-weight:bold; margin-bottom:8px;">[A]</div>
              <div style="font-size:1.8rem; font-weight:bold;">18</div>
            </div>
            <div style="background:rgb(60,145,237); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
              <div style="font-weight:bold; margin-bottom:8px;">[S]</div>
              <div style="font-size:1.8rem; font-weight:bold;">24</div>
            </div>
            <div style="background:rgb(237,80,80); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
              <div style="font-weight:bold; margin-bottom:8px;">[K]</div>
              <div style="font-size:1.8rem; font-weight:bold;">36</div>
            </div>
            <div style="background:rgb(236,221,57); border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
              <div style="font-weight:bold; margin-bottom:8px;">[L]</div>
              <div style="font-size:1.8rem; font-weight:bold;">48</div>
            </div>
          </div>
        `}
      </div>
    `;
  },

  choices: respondentIsMobile
    ? ['18', '24', '36', '48']
    : ['a','s','k','l'],

  button_html: respondentIsMobile
    ? (choice, index) => {
        const colors = [
          "rgb(32,150,11)",   // green
          "rgb(60,145,237)",  // blue
          "rgb(237,80,80)",   // red
          "rgb(236,221,57)"   // yellow
        ];
        return `
          <button style="
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            font-weight: 600;
            padding: 2vh 2vw;
            border-radius: 1vw;
            border: none;
            margin: 1vh;
            background-color: ${colors[index]};
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            width: 40vw;
          ">${choice}</button>`;
      }
    : undefined,

  data: {
    part: "attention_check",
    question: "4 × 6",
    correct_answer: "24"
  },

  on_finish: function(data) {
    if (respondentIsMobile) {
      // ✅ Use explicit fallback to prevent undefined errors
      const trialChoices = ['18', '24', '36', '48'];
      if (data.response !== null && data.response < trialChoices.length) {
        data.user_answer = trialChoices[data.response];
      } else {
        data.user_answer = null;
      }
    } else {
      const keyToAnswer = { 'a': '18', 's': '24', 'k': '36', 'l': '48' };
      data.user_answer = keyToAnswer[data.response] || null;
    }
    data.accurate = (data.user_answer === data.correct_answer);
  }
};



///--------------------------------------------------ATTENTION QUESTIONS--------------------------------------------------------------------------------------------------
///-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

///--------------------------------------------------GENERATE FLAT SIAT TEST-----------------------------------------------------------------------------------------------
function generateFlatTrials(trialVars, respondentId, partLabel) {
  const trials = [];

  trialVars.forEach(vars => {
    const trial = {
      type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
      stimulus: () => `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
          
          <!-- CATEGORY -->
          ${vars.category ? `
            <div style="background:#ddd; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center;">
              <p style="font-size:1.2rem; color:#666;">Categoria</p>
              <p style="font-size:2rem; font-weight:600; color:#222;">${vars.category}</p>
            </div>` : ''}

          <!-- IMAGE -->
          ${vars.img_src ? `
            <div style="background:#ddd; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center;">
              <img src="${vars.img_src}" alt="${vars.img_name || ''}" style="max-height:40vh; object-fit:contain;" />
            </div>` : ''}

          <!-- ATTRIBUTE -->
          <div style="background:#fff; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <p style="font-size:2rem; font-weight:700; color:#111;">${vars.attribute}</p>
          </div>

          ${
            respondentIsMobile
              ? ''  // real buttons handled by jsPsychHtmlButtonResponse
              : `
              <!-- DESKTOP FAKE BUTTONS -->
              <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
                <div style="text-align:center;">
                  <div style="background:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                    <div style="font-weight:bold;">[E]</div>
                    <div>Combina</div>
                  </div>
                </div>
                <div style="text-align:center;">
                  <div style="background:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                    <div style="font-weight:bold;">[I]</div>
                    <div>Não combina</div>
                  </div>
                </div>
              </div>`
          }
        </div>
      `,
      choices: respondentIsMobile ? ['Combina', 'Não combina'] : ['e', 'i'],
      button_html: respondentIsMobile
        ? (choice, index) => `
          <button style="
            font-size:clamp(2rem,6vw,6rem);
            font-weight:600;
            padding:3vh 2vw;
            border-radius:2vw;
            border:none;
            background-color:${index===0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
            color:white;
            width:40vw;
            box-shadow:0 0.5vw 1.5vw rgba(0,0,0,0.2);
          ">${choice}</button>`
        : undefined,
      data: {
        part: partLabel,
        respondent_id: respondentId,
        ...vars
      },
      on_finish: function(data) {
        let label;
        if (respondentIsMobile) {
          label = data.response === 0 ? "Combina" : "Não combina";
        } else {
          label = data.response === 'e' ? "Combina" : "Não combina";
        }
        data.selected_label = label;

        if (vars.is_correct !== undefined) {
          data.accurate = (label === (vars.is_correct ? "Combina" : "Não combina"));
        }
        if (data.rt < minRT) data.rt_flag = "too_fast";
        if (data.rt > maxRT) data.rt_flag = "too_slow";
        if (data.rt >= minRT && data.rt <= maxRT) data.rt_flag = "valid";
      }
    };

    trials.push(trial);

    if (respondentIsMobile) {
      trials.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '',
        choices: "NO_KEYS",
        trial_duration: 20,
        data: { trial_category: 'mobile_breaker' }
      });
    }
  });

  return trials;
}
//----------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------Generate Flat MIA Trials TRIAL AND TEST--------------------------------------------------------------------------------------------------------------
// function generateFlatMultiBrandTrials(trialVars, respondentId, partLabel) {
//   const trials = [];

//   trialVars.forEach(vars => {
//     // Support both shapes
//     const imageNames = vars.image_names || vars.brand_options;
//     const imagePaths = vars.image_paths || vars.brand_images;

//     const trial = {
//       type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//       stimulus: () => {
//         const attr = vars.attribute;
//         const brandImgs = imagePaths;
//         const brandKeys = ['A', 'S', 'K', 'L'];
//         const brandKeyColors = [
//           "rgb(32, 150, 11)",
//           "rgb(60, 145, 237)",
//           "rgb(237, 80, 80)",
//           "rgb(236, 221, 57)"
//         ];

//         if (!respondentIsMobile) {
//           const imageBlocks = brandImgs.map((img, i) => `
//             <div style="background:#fff; border-radius:12px; padding:25px; width:220px; 
//                         text-align:center; box-shadow:0 6px 16px rgba(0,0,0,0.1); 
//                         display:flex; flex-direction:column; align-items:center; gap:15px;">
//               <img src="${img}" height="150" style="object-fit:contain;" />
//               <div style="background:${brandKeyColors[i]}; border-radius:8px; padding:8px 10px; 
//                           font-weight:bold; font-family:'Courier New', monospace; font-size:18px;">
//                 [${brandKeys[i]}]
//               </div>
//             </div>`).join("");

//           return `
//             <div style="display:flex; flex-direction:column; align-items:center; padding:4vh 4vw; width:100%;">
//               <div style="background:#ddd; border-radius:16px; padding:3vh 5vw; max-width:700px; text-align:center; margin-bottom:4vh;">
//                 <p style="font-size:1.5rem; color:#666;">Which image best represents:</p>
//                 <p style="font-size:2.2rem; font-weight:700; color:#111;">${attr}</p>
//               </div>
//               <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:60px; max-width:1100px;">
//                 ${imageBlocks}
//               </div>
//             </div>`;
//         }

//         // Mobile
//         return `
//           <div style="text-align:center; padding:4vh 5vw;">
//             <p style="font-size:1.2rem; color:#999;">Which brand best represents:</p>
//             <p style="font-size:1.6rem; font-weight:700; color:#111; margin-bottom:4vh;">${attr}</p>
//           </div>`;
//       },
//       choices: respondentIsMobile ? ['0', '1', '2', '3'] : ['a', 's', 'k', 'l'],
//       button_html: respondentIsMobile
//         ? (choice, index) => {
//             const img = imagePaths[index];
//             return `
//               <button style="background:none; border:none; width:47%; aspect-ratio:1/1; 
//                              border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.15); overflow:hidden;">
//                 <img src="${img}" style="width:100%; height:100%; object-fit:contain;" />
//               </button>`;
//           }
//         : undefined,
//       data: {
//         part: partLabel,
//         respondent_id: respondentId,
//         attribute: vars.attribute,
//         image_names: imageNames,
//         image_paths: imagePaths,
//         correct_image: vars.correct_image || null
//       },
//       on_finish: function(data) {
//         if (respondentIsMobile) {
//           data.selected_image = imageNames[data.response];
//         } else {
//           const keyToIndex = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
//           const idx = keyToIndex[data.response];
//           data.selected_image = imageNames[idx];
//         }
//         if (vars.correct_image) {
//           data.correct = data.selected_image === vars.correct_image;
//         }
//       }
//     };

//     trials.push(trial);

//     if (respondentIsMobile) {
//       trials.push({
//         type: jsPsychHtmlKeyboardResponse,
//         stimulus: '',
//         choices: "NO_KEYS",
//         trial_duration: 20,
//         data: { trial_category: 'mobile_breaker' }
//       });
//     }
//   });

//   return trials;
// }
function generateFlatMultiBrandTrials(trialVars, respondentId, partLabel, isPretest=false) {
  const trials = [];

  trialVars.forEach(vars => {
    const imageNames = vars.image_names || vars.brand_options;
    const imagePaths = vars.image_paths || vars.brand_images;

    const trial = {
      type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
      stimulus: () => {
        const attr = vars.attribute;  // ✅ no vars.data
        const brandImgs = imagePaths;
        const promptText = isPretest ? "Qual imagem melhor representa:" : "Qual marca melhor representa:";
        const brandKeys = ['A', 'S', 'K', 'L'];
        const brandKeyColors = [
          "rgb(32, 150, 11)",
          "rgb(60, 145, 237)",
          "rgb(237, 80, 80)",
          "rgb(236, 221, 57)"
        ];

        if (!respondentIsMobile) {
          const imageBlocks = brandImgs.map((img, i) => `
            <div style="background:#fff; border-radius:12px; padding:20px;
                        width:clamp(180px, 22vw, 240px);
                        text-align:center; box-shadow:0 6px 16px rgba(0,0,0,0.1);
                        display:flex; flex-direction:column; align-items:center; gap:12px;">
              <img src="${img}" style="width:100%; aspect-ratio:1/1; object-fit:contain;" />
              <div style="background:${brandKeyColors[i]};
                          border-radius:8px; padding:8px 10px;
                          font-weight:bold; font-family:'Courier New', monospace; font-size:18px;">
                [${brandKeys[i]}]
              </div>
            </div>`).join("");

          return `
            <div style="display:flex; flex-direction:column; align-items:center; padding:4vh 4vw; width:100%;">
              <div style="background:#ddd; border-radius:16px; padding:3vh 5vw;
                          width:min(800px, 90vw); text-align:center; margin:0 auto 4vh;">
                <p style="font-size:1.5rem; color:#666;">${promptText}</p>
                <p style="font-size:2.2rem; font-weight:700; color:#111;">${attr}</p>
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(clamp(180px, 22vw, 240px), 1fr));
                          gap:clamp(20px, 3vw, 48px); width:min(1100px, 96vw); margin-inline:auto; justify-items:center;">
                ${imageBlocks}
              </div>
            </div>`;
        }

        // 📱 Mobile layout
        return `<div style="text-align:center; padding:4vh 5vw;">
                  <p style="font-size:1.2rem; color:#999;">${promptText}</p>
                  <p style="font-size:1.6rem; font-weight:700; color:#111; margin-bottom:4vh;">${attr}</p>
                </div>`;
      },
      choices: respondentIsMobile ? ['0','1','2','3'] : ['a','s','k','l'],
      button_html: respondentIsMobile
        ? (choice, index) => {
            const img = imagePaths[index];
            return `<button style="background:none; border:none; width:47%; aspect-ratio:1/1;
                                    border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.15); overflow:hidden;">
                      <img src="${img}" style="width:100%; height:100%; object-fit:contain;" />
                    </button>`;
          }
        : undefined,
      data: {
        part: partLabel,
        respondent_id: respondentId,
        attribute: vars.attribute,  // ✅ correct
        image_names: imageNames,
        image_paths: imagePaths,
        correct_image: isPretest ? vars.correct_image : null
      },
      on_finish: function(data) {
        let selectedImage;
        if (respondentIsMobile) {
        if (data.response !== null && data.response < data.image_names.length) {
        selectedImage = data.image_names[data.response];
        } else {
        selectedImage = null;
        }
        } else {
          const keyToIndex = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
          const idx = keyToIndex[data.response];
          selectedImage = data.image_names[idx];
        }
        data.selected_image = selectedImage;
        if (vars.correct_image) {
          data.correct_image = vars.correct_image;
          data.accurate = (selectedImage === vars.correct_image);
        }
      }
    };

    trials.push(trial);

    if (respondentIsMobile) {
      trials.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '',
        choices: "NO_KEYS",
        trial_duration: 20,
        data: { trial_category: 'mobile_breaker' }
      });
    }
  });

  return trials;
}


  //--------------------------------------------Generate Flat Pre Test--------------------------------------------------------------------------------------------------------------

// 🔧 Generate pretest trials as flat array
// function generatePretestTrials(images, attributes, respondentId) {
//   const trials = [];
//   const trialPairs = [];


//   images.forEach(img => {
//     attributes.forEach(attr => {
//       // Build a trial object directly, not timelineVariables
//       const trial = {
//         type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//         stimulus: () => {
//           return `
//             <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; width:100%;">
//               <!-- IMAGE BOX -->
//               <div style="
//                 background-color: rgb(216,212,212);
//                 border-radius: 8px;
//                 padding: 1.5vh 2.5vw;
//                 margin-bottom: 2vh;
//                 width: 80%;
//                 max-width: 700px;
//                 text-align: center;
//                 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//               ">
//                 <p style="font-size: clamp(1rem, 2.5vw, 1.3rem); color: #999; margin-bottom: 1vh;">Stim</p>
//                 <img src="${img.img}" alt="${img.name}" style="
//                   width:auto; max-width:100%;
//                   height: clamp(30vh, 50vh, 60vh);
//                   object-fit:contain;
//                   margin-bottom:1vh;
//                 "/>
//               </div>

//               <!-- ATTRIBUTE BOX -->
//               <div style="
//                 background-color: #fff;
//                 border-radius: 10px;
//                 padding: 1.5vh 2.5vw;
//                 margin-bottom: 3vh;
//                 width: 80%;
//                 max-width: 400px;
//                 text-align:center;
//                 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//               ">
//                 <p style="font-size: clamp(2rem, 5.5vw, 4rem);
//                           font-weight: 700;
//                           color: #111;
//                           margin: 0;
//                           line-height:1;">
//                   ${attr}
//                 </p>
//               </div>

//               ${
//                 respondentIsMobile
//                   ? ''
//                   : `
//                     <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
//                       <div style="text-align:center;">
//                         <div style="background-color:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:250px;">
//                           <div style="font-weight:bold;">[E]</div>
//                           <div>Combina</div>
//                         </div>
//                       </div>
//                       <div style="text-align:center;">
//                         <div style="background-color:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:250px;">
//                           <div style="font-weight:bold;">[I]</div>
//                           <div>Does not fit</div>
//                         </div>
//                       </div>
//                     </div>
//                   `
//               }
//             </div>
//           `;
//         },
//         choices: respondentIsMobile ? ['Combina', 'Does not fit'] : ['e', 'i'],
//         button_html: respondentIsMobile
//           ? (choice, index) => `
//               <button style="
//                 font-size: clamp(2rem, 6vw, 6rem);
//                 font-weight:600;
//                 padding:3vh 2vw;
//                 border-radius:2vw;
//                 border:none;
//                 background-color:${index===0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
//                 color:white;
//                 box-shadow:0 0.5vw 1.5vw rgba(0,0,0,0.2);
//                 width:40vw;
//               ">${choice}</button>`
//           : undefined,
//         data: {
//           part: "pretest_single_implicit",
//           respondent_id: respondentId,
//           img_src: img.img,
//           category_name: img.name,
//           attribute: attr,
//           is_correct: img.correct.includes(attr)
//         },
//         on_finish: function (data) {
//           let userSaysFits;
//           if (respondentIsMobile) {
//             userSaysFits = data.response === 0;
//           } else {
//             userSaysFits = data.response === 'e';
//           }
//           data.user_answer = userSaysFits ? "Fits" : "Does not fit";
//           data.correct_answer = data.is_correct ? "Fits" : "Does not fit";
//           data.accurate = (userSaysFits === data.is_correct);
//         },
//         show_progress_bar: true  // ✅ progress bar updates every trial
//       };

//      const pair = [trial];

//       if (respondentIsMobile) {
//         pair.push({
//           type: jsPsychHtmlKeyboardResponse,
//           stimulus: '',
//           choices: "NO_KEYS",
//           trial_duration: 20,
//           data: { trial_category: 'mobile_breaker' }
//         });
//       }

//       trialPairs.push(pair);
//     });
//   });

//   // Shuffle the trial+breaker pairs
//   return jsPsych.randomization.shuffle(trialPairs).flat();
// }

// // ✅ Build once
// const pretest_trials = generatePretestTrials(pretest_images, pretest_attributes, respondent_id);

function generatePretestTrials(images, attributes, respondentId, mode="balanced") {
  // mode can be "correct_only", "balanced", or "extended"
  const trials = [];
  const trialPairs = [];

  images.forEach(img => {
    // Correct attributes
    const correctAttrs = img.correct;

    if (mode === "correct_only") {
      // Only correct attributes
      correctAttrs.forEach(attr => {
        trialPairs.push(makeTrial(img, attr, respondentId));
      });

    } else {
      // For balanced/extended, include distractors
      const distractors = attributes.filter(a => !correctAttrs.includes(a));
      const numDistractors = (mode === "balanced") ? 1 : 2;

      correctAttrs.forEach(attr => {
        // Always include the correct one
        trialPairs.push(makeTrial(img, attr, respondentId));
      });

      // Add random distractors
      const sampled = jsPsych.randomization.sampleWithoutReplacement(distractors, numDistractors);
      sampled.forEach(attr => {
        trialPairs.push(makeTrial(img, attr, respondentId));
      });
    }
  });

  // Shuffle and flatten (mobile breaker support stays the same)
  return jsPsych.randomization.shuffle(trialPairs).flat();
}

function makeTrial(img, attr, respondentId) {
  const trial = {
    type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
    stimulus: () => `
     
  <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
    <!-- IMAGE -->
    <div style="background:#ddd; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center;">
      <img src="${img.img}" alt="${img.name}" style="max-height:40vh; object-fit:contain;" />
    </div>

    <!-- ATTRIBUTE -->
    <div style="background:#fff; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <p style="font-size:2rem; font-weight:700; color:#111;">${attr}</p>
    </div>
    ${respondentIsMobile ? '' : `
    <!-- DESKTOP FAKE BUTTONS -->
    <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
      <div style="text-align:center;">
        <div style="background:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <div style="font-weight:bold;">[E]</div>
          <div>Combina</div>
        </div>
      </div>
      <div style="text-align:center;">
        <div style="background:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <div style="font-weight:bold;">[I]</div>
          <div>Não combina</div>
        </div>
      </div>
    </div>
  </div>`}
`  ,  choices: respondentIsMobile ? ['Combina', 'Não combina'] : ['e', 'i'],

    button_html: respondentIsMobile ? (choice, index) => `
      <button style="
        font-size:clamp(2rem,6vw,6rem);
        font-weight:600;
        padding:3vh 2vw;
        border-radius:2vw;
        border:none;
        background-color:${index===0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
        color:white;
        width:40vw;
        box-shadow:0 0.5vw 1.5vw rgba(0,0,0,0.2);
      ">${choice}</button>` : undefined,

    data: {
      part: "pretest_single_implicit",
      respondent_id: respondentId,
      img_src: img.img,
      category_name: img.name,
      attribute: attr,
      is_correct: img.correct.includes(attr)
    },
    on_finish: function(data) {
      let userSaysFits;
      if (respondentIsMobile) {
        userSaysFits = data.response === 0;
      } else {
        userSaysFits = data.response === 'e';
      }
      data.user_answer = userSaysFits ? "Combina" : "Não combina";
      data.correct_answer = data.is_correct ? "Combina" : "Não combina";
      data.accurate = (userSaysFits === data.is_correct);
    }
  };
  if (respondentIsMobile) {
    return [
      trial,
      {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '',
        choices: "NO_KEYS",
        trial_duration: 20,
        data: { trial_category: 'mobile_breaker', part: "Breaker" }
      }
    ];
  }

return trial};

const pretest_trials = generatePretestTrials(pretest_images, pretest_attributes, respondent_id, 'balanced');

// ✅ Flatten directly into main timeline

//------------------------------------------------------------------------------------------------------
// Generate trials for Multiple implicitit pretesting
//-------------------------------------------------------------------------------------------------------

function generateMultiplePretestTrials(attributes, images) {
  const trials = [];

  attributes.forEach(attr => {
    // Identify the correct image for this attribute
    const correctImage = images.find(img => img.correct.includes(attr));
    const otherImages = images.filter(img => img !== correctImage);
    
    // Choose 3 random distractors
    const distractors = jsPsych.randomization.sampleWithoutReplacement(otherImages, 3);

    // Combine & shuffle
    const allOptions = jsPsych.randomization.shuffle([correctImage, ...distractors]);

    trials.push({
      attribute: attr,
      image_names: allOptions.map(img => img.name),
      image_paths: allOptions.map(img => img.img),
      correct_image: correctImage.name
    });
  });

  return jsPsych.randomization.shuffle(trials);
}
const pretest_trials_multiple = generateMultiplePretestTrials(pretest_attributes_multiple, pretest_images_multiple)

console.log(pretest_trials_multiple);




//------------------------------------------------------------------------------------------------------
function generateCategoryFitTrials(category, attributes) {
  return attributes.map(attr => ({
    category: category,
    attribute: attr
  }));
}
const category_fit_trials = generateCategoryFitTrials(category, attributes);




//------------------------------------------------------------------------------------------------------
function generateCompleteBrandAttributeTrials(attributes, brands) {
  const trials = [];
  const brandAttrSeen = {};

  // Initialize brand-attribute matrix
  attributes.forEach(attr => {
    brandAttrSeen[attr] = {};
    brands.forEach(b => {
      brandAttrSeen[attr][b.name] = false;
    });
  });

  // Continue until all brand-attribute pairs are covered
  while (
    attributes.some(attr =>
      brands.some(b => !brandAttrSeen[attr][b.name])
    )
  ) {
    for (let attr of jsPsych.randomization.shuffle(attributes)) {
      // Filter brands not yet used with this attribute
      const unseen = brands.filter(b => !brandAttrSeen[attr][b.name]);

      // Fill with seen brands if we need 4 options
      const fillers = brands.filter(b => brandAttrSeen[attr][b.name]);
      const needed = 4 - unseen.length;
      const fillerSample = jsPsych.randomization.sampleWithoutReplacement(fillers, Math.max(0, needed));

      const trialBrands = jsPsych.randomization.shuffle([...unseen, ...fillerSample]).slice(0, 4);

      trialBrands.forEach(b => {
        brandAttrSeen[attr][b.name] = true;
      });

      trials.push({
        attribute: attr,
        brand_options: trialBrands.map(b => b.name),
        brand_images: trialBrands.map(b => b.img)
      });
    }
  }

  return trials;
}
const multi_brand_trials = generateCompleteBrandAttributeTrials(attributes, brands);
// console.log(multi_brand_trials)


//----------------------------------------------------LOOP TO TRACK RESPONSE TIME------------------------------------------------------------------------------
// function wrapTrialWithRTCheck(trial) {
//   return {
//     timeline: [
//       trial,
//       {
//         type: jsPsychHtmlKeyboardResponse,
//         stimulus: function () {
//           const last = jsPsych.data.get().last(1).values()[0];
//           if (last.rt < minRT) {
//             return `<p style="font-size:2rem; color:red;">
//                       ⚡ Too fast! Please slow down.<br>
//                       Press any key to repeat the same trial.
//                     </p>`;
//           }
//           if (last.rt > maxRT) {
//             return `<p style="font-size:2rem; color:red;">
//                       🐢 Too slow! Please respond faster.<br>
//                       Press any key to repeat the same trial.
//                     </p>`;
//           }
//           return ""; // ✅ just an empty string, never "null"
//         },
//         choices: "ALL_KEYS",
//         trial_duration: function () {
//           const last = jsPsych.data.get().last(1).values()[0];
//           return (last.rt < minRT || last.rt > maxRT) ? null : 0;
//           // ✅ if valid → 0ms duration, trial ends instantly (no click)
//         },
//         on_finish: function (data) {
//           data.is_feedback = true;
//         }
//       }
//     ],
//     loop_function: function () {
//       const last = jsPsych.data.get().last(2).values()[0];
//       const tooFast = last.rt < minRT;
//       const tooSlow = last.rt > maxRT;
//       return (tooFast || tooSlow);
//     }
//   };
// }
// function wrapTrialWithRTCheck(trial) {
//   return {
//     timeline: [
//       trial,
//       {
//         timeline: [
//           {
//             type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//             stimulus: function () {
//               // 🔎 Find last non-breaker trial
//               const all = jsPsych.data.get().values();
//               let lastReal;
//               for (let i = all.length - 1; i >= 0; i--) {
//                 if (all[i].trial_category !== 'mobile_breaker' && !all[i].is_feedback) {
//                   lastReal = all[i];
//                   break;
//                 }
//               }
//               if (!lastReal) return "";

//               if (lastReal.rt < minRT) {
//                 return `<p style="font-size:2rem; color:red;">
//                           ⚡ Too fast! Please slow down.<br>
//                           ${respondentIsMobile ? "" : "Press any key to repeat."}
//                         </p>`;
//               }
//               if (lastReal.rt > maxRT) {
//                 return `<p style="font-size:2rem; color:red;">
//                           🐢 Too slow! Please respond faster.<br>
//                           ${respondentIsMobile ? "" : "Press any key to repeat."}
//                         </p>`;
//               }
//               return ""; // valid RT → instant skip
//             },
//             choices: respondentIsMobile ? ["Continue"] : "ALL_KEYS",
//             button_html: respondentIsMobile
//               ? () => `
//                 <button style="
//                   font-size: clamp(2rem, 6vw, 6rem);
//                   font-weight: 600;
//                   padding: 2.5vh 6vw;
//                   margin-top: 4vh;
//                   border-radius: 2vw;
//                   border: none;
//                   background-color: rgba(237,80,80,0.9);
//                   color: white;
//                   width: 80vw;
//                   max-width: 500px;
//                 ">Continue</button>`
//               : undefined,
//             trial_duration: function () {
//               // ⏱ valid → auto-skip
//               const all = jsPsych.data.get().values();
//               let lastReal;
//               for (let i = all.length - 1; i >= 0; i--) {
//                 if (all[i].trial_category !== 'mobile_breaker' && !all[i].is_feedback) {
//                   lastReal = all[i];
//                   break;
//                 }
//               }
//               if (!lastReal) return 0;
//               return (lastReal.rt < minRT || lastReal.rt > maxRT) ? null : 0;
//             },
//             on_finish: function (data) {
//               data.is_feedback = true;
//             }
//           },
//           // 📱 Mobile breaker AFTER feedback, clears screen before repeat
//           {
//             type: jsPsychHtmlKeyboardResponse,
//             stimulus: "",
//             choices: "NO_KEYS",
//             trial_duration: 50,
//             data: { trial_category: "mobile_breaker" },
//             conditional_function: function () {
//               // Only insert breaker if feedback ran
//               const last = jsPsych.data.get().last(1).values()[0];
//               return last && last.is_feedback;
//             }
//           }
//         ]
//       }
//     ],
//     loop_function: function () {
//       // 🔎 Use last non-breaker trial for RT check
//       const all = jsPsych.data.get().values();
//       let lastReal;
//       for (let i = all.length - 1; i >= 0; i--) {
//         if (all[i].trial_category !== 'mobile_breaker' && !all[i].is_feedback) {
//           lastReal = all[i];
//           break;
//         }
//       }
//       if (!lastReal) return false;
//       return (lastReal.rt < minRT || lastReal.rt > maxRT);
//     }
//   };
// }

// function getLastRealTrial() {
//   const all = jsPsych.data.get().values();
//   for (let i = all.length - 1; i >= 0; i--) {
//     if (all[i].trial_category !== 'mobile_breaker' && !all[i].is_feedback) {
//       return all[i];
//     }
//   }
//   return null;
// }
function getLastRealTrial() {
  const all = jsPsych.data.get().values();
  for (let i = all.length - 1; i >= 0; i--) {
    if (all[i].trial_category !== 'mobile_breaker' && !all[i].is_feedback) {
      return all[i];
    }
  }
  return null;
}

function wrapTrialWithRTCheck(trial) {
  return {
    timeline: [
      trial,

      // 📱 breaker BEFORE feedback (mobile only)
      ...(respondentIsMobile ? [{
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "",
        choices: "NO_KEYS",
        trial_duration: 30,
        data: { trial_category: "mobile_breaker" }
      }] : []),

      {
        type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
        stimulus: function () {
          const lastReal = getLastRealTrial();
          if (!lastReal) return "";

          if (lastReal.rt < minRT) {
            return `<p style="font-size:2rem; color:red;">
                      ⚡ Muito rápido! Por favor, vá mais devagar.<br>
                      ${respondentIsMobile ? "" : "Pressione qualquer tecla para repetir."}
                    </p>`;
          }
          if (lastReal.rt > maxRT) {
            return `<p style="font-size:2rem; color:red;">
                      🐢 Muito lento! Por favor, responda mais rápido.<br>
                      ${respondentIsMobile ? "" : "Pressione qualquer tecla para repetir."}
                    </p>`;
          }
          return "";
        },
        choices: respondentIsMobile ? ["Continue"] : "ALL_KEYS",
        button_html: respondentIsMobile
          ? () => `
            <button style="
              font-size: clamp(2rem, 6vw, 6rem);
              font-weight: 600;
              padding: 2.5vh 6vw;
              margin-top: 4vh;
              border-radius: 2vw;
              border: none;
              background-color: rgba(237,80,80,0.9);
              color: white;
              width: 80vw;
              max-width: 500px;
            ">Continue</button>`
          : undefined,
        trial_duration: function () {
          const lastReal = getLastRealTrial();
          if (!lastReal) return 0;
          return (lastReal.rt < minRT || lastReal.rt > maxRT) ? null : 0; // null = wait for click, 0 = skip
        },
        on_finish: function (data) {
          data.is_feedback = true;
        }
      },

      // 📱 breaker AFTER feedback (mobile only)
      ...(respondentIsMobile ? [{
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "",
        choices: "NO_KEYS",
        trial_duration: 30,
        data: { trial_category: "mobile_breaker" },
        conditional_function: function () {
          const last = jsPsych.data.get().last(1).values()[0];
          return last && last.is_feedback;
        }
      }] : [])
    ],

    loop_function: function () {
      const lastReal = getLastRealTrial();
      if (!lastReal) return false;
      return (lastReal.rt < minRT || lastReal.rt > maxRT);
    }
  };
}







//--------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------LOOP TO TRACK PRETEST ACCURACY--------------------------------------------------------------------------------
// function wrapPretestBlock(trials, minCorrect, partLabel) {
//   return {
//     timeline: [
//       {
//         timeline: trials
//       },
//        ...(respondentIsMobile ? [{
//         type: jsPsychHtmlKeyboardResponse,
//         stimulus: "",
//         choices: "NO_KEYS",
//         trial_duration: 30,
//         data: { trial_category: "mobile_breaker" }
//       }] : []),
//       {
//         type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//         stimulus: function() {
//           // ✅ Only count the last block’s trials, ignoring breakers
//           const blockData = jsPsych.data.get().last(trials.length)
//             .filter(d => d.part === partLabel && d.trial_category !== "mobile_breaker" || d.part === "Breaker");

//           const correctCount = blockData.filter({accurate: true}).count();
//           const totalCount   = blockData.count();

//           if (correctCount >= minCorrect) {
//             return `
//               <div style="text-align:center; font-size:2rem; font-weight:500;">
//                 <p>✅ You got ${correctCount} correct.</p>
//                 <p>Great! Moving on.</p>
//                 ${respondentIsMobile ? '' : '<p>Press any key to continue</p>'}
//               </div>
//             `;
//           } else {
//             return `
//               <div style="text-align:center; font-size:2rem; font-weight:500;">
//                 <p>❌ You only got ${correctCount} correct.</p>
//                 <p>Please try again.</p>
//                 ${respondentIsMobile ? '' : '<p>Press any key to continue</p>'}
//               </div>
//             `;
//           }
//         },
//         choices: respondentIsMobile ? ['Continue'] : "ALL_KEYS",
//         button_html: respondentIsMobile
//           ? (choice, index) => `
//               <button style="
//                 font-size: clamp(2rem, 6vw, 6rem); 
//                 font-weight: 500;
//                 padding: 2.5vh 6vw;
//                 margin-top: 4vh;
//                 border-radius: 2vw;
//                 border: none;
//                 background-color: rgba(62,126,245,0.91);
//                 color: white;
//                 box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
//                 cursor: pointer;
//                 width: 80vw;
//                 max-width: 500px;
//               ">${choice}</button>`
//           : undefined,
//         on_finish: function(data) {
//           data.is_feedback = true;
//         }
//       },
      
//     ],
//     ...(respondentIsMobile ? [{
//         type: jsPsychHtmlKeyboardResponse,
//         stimulus: "",
//         choices: "NO_KEYS",
//         trial_duration: 30,
//         data: { trial_category: "mobile_breaker" }
//       }] : []),
//     loop_function: function() {
//       const blockData = jsPsych.data.get().last(trials.length)
//         .filter(d => d.part === partLabel && d.trial_category !== "mobile_breaker");

//       const correctCount = blockData.filter({accurate: true}).count();
//       return correctCount < minCorrect;
//     }
//   };
// }

function wrapPretestBlock(trials, minCorrect, partLabel) {
  const mobileBreakerTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: 30,
    data: { trial_category: "mobile_breaker" }
  };

  return {
    timeline: [
      { timeline: trials },

      // 📱 breaker BEFORE feedback
      ...(respondentIsMobile ? [mobileBreakerTrial] : []),

      // feedback screen
      {
        type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
        stimulus: function() {
          const blockData = jsPsych.data.get().last(trials.length)
            .filter(d => d.part === partLabel && d.trial_category !== "mobile_breaker");

          const correctCount = blockData.filter({accurate: true}).count();
          const totalCount   = blockData.count();

          if (correctCount >= minCorrect) {
            return `
              <div style="text-align:center; font-size:2rem; font-weight:500;">
                <p>✅ Você acertou ${correctCount}.</p>
                <p>Ótimo! Vamos continuar.</p>
                ${respondentIsMobile ? '' : '<p>Pressione qualquer tecla para continuar.</p>'}
              </div>
            `;
          } else {
            return `
              <div style="text-align:center; font-size:2rem; font-weight:500;">
                <p>❌ You only got ${correctCount} correct.</p>
                <p>Please try again.</p>
                ${respondentIsMobile ? '' : '<p>Pressione qualquer tecla para continuar.</p>'}
              </div>
            `;
          }
        },
        choices: respondentIsMobile ? ['Continue'] : "ALL_KEYS",
        button_html: respondentIsMobile
          ? (choice, index) => `
              <button style="
                font-size: clamp(2rem, 6vw, 6rem); 
                font-weight: 500;
                padding: 2.5vh 6vw;
                margin-top: 4vh;
                border-radius: 2vw;
                border: none;
                background-color: rgba(62,126,245,0.91);
                color: white;
                box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
                cursor: pointer;
                width: 80vw;
                max-width: 500px;
              ">${choice}</button>`
          : undefined,
        on_finish: function(data) {
          data.is_feedback = true;
        }
      },

      // 📱 breaker AFTER feedback
      ...(respondentIsMobile ? [mobileBreakerTrial] : [])
    ],

    loop_function: function() {
      const blockData = jsPsych.data.get().last(trials.length)
        .filter(d => d.part === partLabel && d.trial_category !== "mobile_breaker");

      const correctCount = blockData.filter({accurate: true}).count();
      return correctCount < minCorrect;
    }
  };
}





//---------------------------------------------------------------------------------------------------------------------------------------------------------

//UPLOAD IMAGES FOR PRELOAD HERE
////--------------------------------------------------------------------------------------------------------------------------------------------------------
const preload = {
  type: jsPsychPreload,
  images : 
  [
   'img/SingleImplicitMotivationimage.png',
   'img/MIAT_image.png',
   'pretest_img/pretest_cat.png',
   'pretest_img/pretest_fire.png',
   'pretest_img/pretest_driving.png',
   'pretest_img/pretest_icecube.png',
   'pretest_img/pretest_ocean.png',
   'pretest_img/pretest_clock.png',
   'img/Disnep+.png',
   'img/Globoplay.png',
   'img/Netflix.png',
   'img/Prime_video.png'
  ]
}

timeline.push(preload);

//--------------------------------------------------------------------------------------------------------------------------------------------------------
////--------------------------------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
// add a new htmlkeyboard response to clear the loading bar from the screen
//--------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});
//------------------------------------------------------------------------------------------------------

timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 5vw;
      
      <p1 style="font-size: clamp(1.6rem, 4.0vw, 2rem); font-weight: 600; margin-bottom: 2vh;">
        Bem-vindo(a) à nossa Pesquisa de Associação Implícita!
      </p>
      <p style="font-size: clamp(1.4rem, 4.5vw, 2rem); margin-bottom: 1vh;">
        Obrigado(a) pelo seu tempo!
      </p>
      ${
        respondentIsMobile
          ? ""
          : '<p style="font-size: clamp(1rem, 3vw, 1.3rem); margin-bottom: 3vh;">Pressione a barra de espaço para continuar.</p>'
      }
      <p style="color: white; font-size: clamp(0.8rem, 2.5vw, 1rem); margin-top: 5vh;">
        Program built by Nicholas Brereton
      </p>
    </div>
  `,
  save_trial_parameters: {
    stimulus: false
  },
  // FIX: button_html must be a function, not a string
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Begin'] : [' ']
});



//----------------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});

//----------------------------------------------------------------------------------------------------------------

timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `<div>
    <h2 style = "font-size: 2.5rem"> Este teste mede o tempo de resposta. Não existem respostas erradas. </h2>
  </div>
  ${
    respondentIsMobile 
      ? "" 
      : `
        <h3 style="font-size: clamp(1.2rem, 2.5vw, 2rem); margin-bottom: 2vh;">
          Pressione qualquer tecla para continuar.
        </h3>
        <img 
          src='img/SingleImplicitMotivationimage.png' 
          style="
            width: auto;
            max-width: 90vw;
            max-height: 60vh;
            object-fit: contain;
            margin-top: 2vh;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          "
        />
      `
  }`,
  save_trial_parameters: {
    simulus: false
  },
   button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Ready'] : "ALL_KEYS",
});


//------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});

//------------------------------------------------------------------------------------------------------

timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `<div>
  <h2 style = "font-size: 2.0rem" > Começaremos com um pré-teste para estabelecer uma linha de base. </h2>
  </div>
  ${
    respondentIsMobile
    ? ""
    : "<p style='font-size: 18px> ;'>Pressione qualquer tecla para começar. </p>"
  }`,
  save_trial_parameters: {
    simulus: false
  },
   button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Begin Pre-Test'] : "ALL_KEYS",
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------ADDING SINGLE PRE-TEST TRIALS TO TIMELINE------------------------------------------------------------------------------------------------

const pretestBlock = wrapPretestBlock(pretest_trials, 6 , "pretest_single_implicit");
timeline.push(pretestBlock);
//------------------------------------------------------------------------------------------------------

// const singleImplicitTrial = {
//   type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//   stimulus: function () {
//     const imgSrc = jsPsych.timelineVariable('img_src');
//     const attr   = jsPsych.timelineVariable('attribute');
//     const cat    = jsPsych.timelineVariable('img_name');

//     return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%;">

//   <!-- IMAGE BOX -->
//   <div style="
//     background-color: rgb(216, 212, 212);
//     border-radius: 8px;
//     padding: 1.5vh 2.5vw;
//     margin-bottom: 2vh;
//     width: 80%;
//     max-width: 700px;
//     text-align: center;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   ">
//     <p style="font-size: clamp(1rem, 2.5vw, 1.3rem); color: #999; margin-bottom: 1vh;">Stim</p>
//     <img src="${imgSrc}" 
//          alt="${cat}" 
//          style="
//            width: auto;
//            max-width: 100%;
//            height: clamp(30vh, 50vh, 60vh);
//            object-fit: contain;
//            margin-bottom: 1vh;
//          " />
//   </div>

//   <!-- ATTRIBUTE BOX -->
//   <div style="
//     background-color: #ffffff;
//     border-radius: 10px;
//     padding: 1.5vh 2.5vw;
//     margin-bottom: 3vh;
//     width: 80%;
//     max-width: 400px;
//     text-align: center;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   ">
//     <p style="
//       font-size: clamp(2rem, 5.5vw, 4rem); 
//       font-weight: 700; 
//       color: #111; 
//       margin: 0;
//       line-height: 1;
//       text-align: center;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       width: 100%;
//     ">
//       ${attr}
//     </p>
//   </div>

// </div>


//     ${
//       respondentIsMobile
//         ? '' // buttons will be rendered by jsPsychHtmlButtonResponse
//         : `
//         <!-- DESKTOP INSTRUCTIONS -->
//         <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
//           <div style="text-align: center;">
//             <div style="
//               background-color: rgb(32, 150, 11);
//               border-radius: 12px;
//               padding: 15px 25px;
//               width: 250px;
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//             ">
//               <div style="font-weight: bold;">[E]</div>
//               <div>Fits</div>
//             </div>
//           </div>
//           <div style="text-align: center;">
//             <div style="
//               background-color: rgb(105, 135, 236);
//               border-radius: 12px;
//               padding: 15px 25px;
//               width: 250px;
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//             ">
//               <div style="font-weight: bold;">[I]</div>
//               <div>Does not fit</div>
//             </div>
//           </div>
//         </div>`
//     }

//   </div>`;
//   },

//   // Choices
//   choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],

//   // Side-by-side BIG MOBILE BUTTONS
//   button_html: respondentIsMobile
//     ? (choice, index) => {
//         return `
//           <button style="
//             font-size: clamp(2rem, 6.0vw, 6.0rem);
//             font-weight: 600;
//             padding: 3vh 2vw;
//             border-radius: 2vw;
//             border: none;
//             background-color: ${index === 0 ? 'rgb(32, 150, 11)' : 'rgb(105, 135, 236)'};
//             color: white;
//             box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
//             cursor: pointer;
//             width: 40vw;
//           ">${choice}</button>`;
//       }
//     : undefined,

//   data: {
//     part: "pretest_single_implicit",
//     respondent_id: respondent_id,
//     img_src: jsPsych.timelineVariable('img_src'),
//     attribute: jsPsych.timelineVariable('attribute'),
//     category_name: jsPsych.timelineVariable('img_name'),
//     is_correct: jsPsych.timelineVariable('is_correct')
//   },

//   on_finish: function(data) {
//     let userSaysFits;
//     if (respondentIsMobile) {
//       userSaysFits = data.response === 0;
//     } else {
//       userSaysFits = data.response === 'e';
//     }
//     data.user_answer = userSaysFits ? "Fits" : "Does not fit";
//     data.correct_answer = data.is_correct ? "Fits" : "Does not fit";
//     data.accurate = (userSaysFits === data.is_correct);
//   }
// };

timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align:center; font-size: 2rem; font-weight: 500;">
      <p>Obrigado.</p>
      <p>O teste real começará após esta etapa.</p>
      ${
        respondentIsMobile
          ? ''  // No keyboard text on mobile
          : '<p>Pressione qualquer tecla para começar.</p>'
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem); 
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Begin'] : 'ALL_KEYS',

  save_trial_parameters: {
    stimulus: false
  }
});

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------

const categoryFit_flat = generateFlatTrials(category_fit_trials, respondent_id, "Single Category IAT");

const insertSingeAttentionTests = Math.floor(categoryFit_flat.length / 2);
categoryFit_flat.splice(insertSingeAttentionTests, 0, attentionCheck1, attentionCheck2);
console.log(categoryFit_flat);

const singleTrialsWithCheck = categoryFit_flat.map(t => wrapTrialWithRTCheck(t));
timeline.push(...singleTrialsWithCheck);



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Single implicit test
//---------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------
//Complete SINGLE IMPLICIT COMPLETE
//------------------------------------------------------------------------------------------------------
const single_implicit_completition_trial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align:center;">
      <p style="font-size: 3rem;">Parte 1 concluída!</p>
      ${
        respondentIsMobile
          ? '' // mobile will have a button
          : '<p>Pressione qualquer tecla para continuar para a parte 2.</p>'
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Continue'] : 'ALL_KEYS',
  save_trial_parameters: {
    stimulus: false
  }
};

const single_implicit_completition_timeline= respondentIsMobile
  ? [single_implicit_completition_trial, mobileBreakerTrial]
  : [single_implicit_completition_trial];

timeline.push({
  timeline: single_implicit_completition_timeline
});
//------------------------------------------------------------------------------------------------------
// Multi Implicit Pretest Trial Start Button
//------------------------------------------------------------------------------------------------------
const multiImplicitIntroTrial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: center; font-size: 2rem; font-weight: 500;">
      <p>Em seguida, começaremos com um pré-teste para estabelecer uma linha de base para a nossa seção de Múltiplas Implícitas.</p>
      <p></p>
     
      ${
        respondentIsMobile
          ? '' // Mobile uses button
          :  `
  <p>Por favor, coloque as duas mãos no teclado, com os dedos indicador e médio sobre as teclas A, S, K e L.</p> 
  <p style="font-size: 1.5rem; color: #666;">Pressione qualquer tecla para continuar.</p> 
  <img src="img/MIAT_image.png" 
       style="max-width:40%; width:100%; height:auto; margin-top:1rem;"/>
`
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6vw, 6rem); 
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Continue'] : 'ALL_KEYS',
  save_trial_parameters: {
    stimulus: false
  }
};
const multi_pretest_intro = respondentIsMobile
? [multiImplicitIntroTrial, mobileBreakerTrial]
: [multiImplicitIntroTrial];

timeline.push({
timeline: multi_pretest_intro});
// timeline_variables: pretest_trials_multiple,
// randomize_order: true
// });

//------------------------------------------------------------------------------------------------------
//Multiple Implicit Pretest Images Trial 
//------------------------------------------------------------------------------------------------------
const multi_pretest_flat = generateFlatMultiBrandTrials(pretest_trials_multiple, respondent_id, "pretest_multiple_implicit", true);
console.log(multi_pretest_flat);
const multipretestBlock = wrapPretestBlock(
  multi_pretest_flat, 
  7, 
  "pretest_multiple_implicit"
);
timeline.push(multipretestBlock);




//-------------------------------------------------------------------------------------------------------------------
// Complete Multiple Pretest
//-------------------------------------------------------------------------------------------------------------------

const multiple_pretest_completion_trial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: center; font-size: 2rem; font-weight: 500;">
      <p>Pré-teste múltiplo concluído!</p>
      <p>A tarefa principal começará em seguida.</p>
      ${
        respondentIsMobile
          ? '' // Mobile uses styled button
          : '<p style="font-size: 1.5rem; color: #666;">Pressione qualquer tecla para continuar para a tarefa principal."</p>'
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6vw, 6rem); 
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Continue'] : 'ALL_KEYS',
  save_trial_parameters: {
    stimulus: false
  }
};

timeline.push({
  timeline: respondentIsMobile
    ? [multiple_pretest_completion_trial, mobileBreakerTrial]
    : [multiple_pretest_completion_trial]
});

//-------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
// Multiple Implicit Brand Test
//------------------------------------------------------------------------------------------------------
const multi_main_flat = generateFlatMultiBrandTrials(multi_brand_trials, respondent_id, "Multiple IAT");
const insertMultiAttentionTests = Math.floor(multi_main_flat.length / 2);
multi_main_flat.splice(insertMultiAttentionTests, 0, attentionCheck3, mobileBreakerTrial, attentionCheck4, mobileBreakerTrial);

const multiple_brand_trials_with_check = multi_main_flat.map(t => wrapTrialWithRTCheck(t));
timeline.push(...multiple_brand_trials_with_check);


timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: center; font-size: 2rem;">
      <p>🎉 Obrigado por participar!</p>
      <p>Por favor, mantenha esta janela aberta até ser redirecionado.</p>
    </div>
  `,
  choices: "NO_KEYS",
  trial_duration: 1000,

  on_finish: async function () {

    if (hasRedirected) return;
    hasRedirected = true;

      const FINAL_URL = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${encodeURIComponent(rdud)}`
       const allData = jsPsych.data.get().values()
       .filter(d =>
        d.trial_type !== "preload" &&
        d.trial_category !== "mobile_breaker" &&
        d.trial_type !== "mobile_breaker" &&
        d.part !== "Breaker" &&
        !d.is_feedback
      );

    let redirected = false;

    setTimeout(() => {
      if (!redirected) {
        window.location.href = FINAL_URL;
      }
    }, 2000);

    try {
      await database.ref(`miat_results/${survey_name}`).push(allData);

      redirected = true;
      window.location.href = FINAL_URL;

    } catch (e) {
      window.location.href = FINAL_URL;
    }
  }
});

console.log(timeline)
jsPsych.run(timeline);


