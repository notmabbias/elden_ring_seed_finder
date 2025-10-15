const elements = [
  {value: "eNone", label: "None", mCamp:true,mRuins:true,mChurch:true,mFort:true},
  {value: "eFire", label: "Fire", mCamp:true,mRuins:false,mChurch:true,mFort:false},
  {value: "eLightning", label: "Lightning", mCamp:true,mRuins:true,mChurch:false,mFort:false},
  {value: "eMadness", label: "Madness", mCamp:true,mRuins:false,mChurch:false,mFort:false},
  {value: "ePoison", label: "Poison", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eBleed", label: "Bleed", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eHoly", label: "Holy", mCamp:false,mRuins:true,mChurch:true,mFort:false},
  {value: "eMagic", label: "Magic", mCamp:false,mRuins:true,mChurch:false,mFort:true},
  {value: "eDeath", label: "Death", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eSleep", label: "Sleep", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eFrost", label: "Frost", mCamp:false,mRuins:true,mChurch:false,mFort:false}
]

$(function () {
  $('#major1').on('change', function () {
    const selected = String($(this).val()); // ensures it's a string

    //probably need an option reset here

    for(let i=0;i<elements.length;i++) {
      if (elements[i][selected]) {
        console.log("base: "+selected+" type:"+elements[i].label);

        //check if true/false
        //create and add option
      }


      //create option
        const option = $('<option>')
        .val(elements[i].value)
        .text(elements[i].label);
    }

    //add option to selection

    $('#elements').prop('selectedIndex', 0); // resets selection
  });
});

//write to check selected value against list in router
//change list in router to be the same (remove sh)
//display good