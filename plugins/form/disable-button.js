export default (context, inject) => {
    inject('disableButton', (button) => {
        button.disabled = true;
        button.classList.add('bg-blue-800');
        button.classList.add('cursor-not-allowed');
    });
}