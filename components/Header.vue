<template>
    <header style="background:rgba(243, 243, 243, 1);">
        <div class="grid p-6 sm:justify-center sm:grid-cols-3 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
            <div class="sm:col-span-2 xl:inline-flex">
                <div class="flex">
                    <VortechronLogo />
                    <DoubleArrowDown @changeState="isOpen = !isOpen"/>
                </div>
                <!-- before enter sm(640px) state -->
                <div v-if="isOpen" class="mt-1 sm:hidden">
                    <VortechronInfo/>
                    <template v-if="this.$auth.loggedIn">
                        <ProfileDropDown />
                    </template>
                    <template v-else>
                        <LoginSignupLink class="mt-2"/>
                    </template>
                </div>
                <!-- entering sm(640px) state -->
                <div class="hidden sm:block mt-2 xl:-mt-0">
                    <VortechronInfo/>
                </div>
            </div>
            <div class="hidden sm:inline-flex sm:justify-end sm:col-span-1 xl:-mt-0">
                <template v-if="this.$auth.loggedIn">
                    <div class="absolute">
                        <ProfileDropDown />
                    </div>
                </template>
                <template v-else>
                    <LoginSignupLink/>
                </template>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data: () => ({
        isOpen: false
    }),
}
</script>