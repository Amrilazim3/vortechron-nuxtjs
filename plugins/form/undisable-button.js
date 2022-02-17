export default (context, inject) => {
    inject('undisableButton', (button) => {
        button.disabled = false;
        button.classList.remove("bg-blue-800");
        button.classList.remove('cursor-not-allowed');
    });
}