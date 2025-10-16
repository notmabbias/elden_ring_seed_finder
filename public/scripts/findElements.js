const elements = [
  {value: "None", label: "None", Camp:true,Ruins:true,Great_Church:true,Fort:true},
  {value: "Fire", label: "Fire", Camp:true,Ruins:false,Great_Church:true,Fort:false},
  {value: "Lightning", label: "Lightning", Camp:true,Ruins:true,Great_Church:false,Fort:false},
  {value: "Madness", label: "Madness", Camp:true,Ruins:false,Great_Church:false,Fort:false},
  {value: "Poison", label: "Poison", Camp:false,Ruins:true,Great_Church:false,Fort:false},
  {value: "Bleed", label: "Bleed", Camp:false,Ruins:true,Great_Church:false,Fort:false},
  {value: "Holy", label: "Holy", Camp:false,Ruins:true,Great_Church:true,Fort:false},
  {value: "Magic", label: "Magic", Camp:false,Ruins:true,Great_Church:false,Fort:true},
  {value: "Death", label: "Death", Camp:false,Ruins:true,Great_Church:false,Fort:false},
  {value: "Sleep", label: "Sleep", Camp:false,Ruins:true,Great_Church:false,Fort:false},
  {value: "Frost", label: "Frost", Camp:false,Ruins:true,Great_Church:false,Fort:false}
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

