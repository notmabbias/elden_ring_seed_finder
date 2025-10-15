$(function () {
  $('#major1').on('change', function () {
    const selected = String($(this).val()).toLowerCase(); // ensures it's a string

    $('#elements option').each(function () {
      const show = $(this).data(selected);
      $(this).toggle(show === true);
    });

    $('#elements').prop('selectedIndex', 0); // resets selection
  });
});


//crappy copilot code ^
//write to check selected value against list in router
//change list in router to be the same (remove sh)
//display good