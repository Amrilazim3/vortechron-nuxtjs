<template>
    <DropDown>
        <template slot="trigger">
            <button @click.prevent="toggleCategory()">
                <div class="flex">
                    <h4 class="text-lg font-bold">Categories</h4>
                    <img src="~/assets/single-drop-down-arrow.svg" alt="" :class="{ 'transform origin-center rotate-180 transition delay-150' : openCategory, 'transform origin-center transition delay-150 transition-all' : !openCategory }">
                </div>
            </button>
        </template>

        <!-- show the lists -->
        <template>
            <div v-if="openCategory" class="absolute z-50 w-full flex flex-col py-2 px-1 overflow-auto bg-gray-100 rounded-xl max-h-28 sm:max-h-36">
                <DropDownItem to="/">One</DropDownItem>
                <DropDownItem to="/">Two</DropDownItem>
                <DropDownItem to="/">Three</DropDownItem>
            </div>
        </template>
    </DropDown>
</template>

<script>
export default {
    data: () => ({
        openCategory: false,
    }),

    methods: {
        toggleCategory() {
            if (this.openCategory) {
                return this.hideCategory()
            }
            return this.showCategory()
        },

        showCategory() {
            this.openCategory = true;
            setTimeout(() => document.addEventListener('click', this.hideCategory), 0);
        },

        hideCategory() {
            this.openCategory = false;
            document.removeEventListener('click', this.hideCategory);
        }
    },
}
</script>