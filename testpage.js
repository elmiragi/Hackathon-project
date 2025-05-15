  document.getElementsByClassName('remove-button').addEventListener('click', function() {
    const element = document.getElementsByClassName('add-variant-answer');
    if (element) {
      element.parentNode.removeChild(element);
    
    }
  });

  const submitBtn = document.getElementById('check-answer');
if (submitBtn) {
            submitBtn.remove(); 
}