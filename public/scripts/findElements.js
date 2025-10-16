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
    const selected = String($(this).val()); 
  
    //empty select elements
    $('#elements1').empty();

    //loop through to check to show
    for(let i=0;i<elements.length;i++) {
      if (elements[i][selected]) {
        console.log("base: "+selected+" type:"+elements[i].label);

        //add option
        const option = $('<option>')
        .val(elements[i].value)
        .text(elements[i].label);

        //add to elements1
        $('#elements1').append(option);
      }
    }
  });
});


$(function () {
  $('#major2').on('change', function () {
    const selected = String($(this).val()); 
  
    //empty select elements
    $('#elements2').empty();

    //loop through to check to show
    for(let i=0;i<elements.length;i++) {
      if (elements[i][selected]) {
        console.log("base: "+selected+" type:"+elements[i].label);

        //add option
        const option = $('<option>')
        .val(elements[i].value)
        .text(elements[i].label);

        //add to elements1
        $('#elements2').append(option);
      }
    }
  });
});

