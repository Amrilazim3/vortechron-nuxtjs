export default ({ app, redirect }) => {
    if (!app.$auth.user.email_verified_at && !app.$auth.user.service) { 
        return redirect('/user/account/profile/edit-profile');
    }
}