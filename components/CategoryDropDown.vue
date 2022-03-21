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
            <div v-if="openCategory" class="absolute z-50 flex flex-col px-1 py-2 overflow-auto bg-gray-100 rounded-xl max-h-28 sm:max-h-36">
                <DropDownItem 
                    to="/dashboard"
                    :class="$nuxt.$route.path == '/dashboard' ? 'bg-gray-300' : ''"
                >
                    None
                </DropDownItem>
                <DropDownItem 
                    :to="`/posts/categories/${category.slug}`" 
                    v-for="category in categories"
                    :key="category.name"
                    :class="$nuxt.$route.path == `/posts/categories/${category.slug}` ? 'bg-gray-300' : ''"
                >
                    {{ category.name }}
                </DropDownItem>
            </div>
        </template>
    </DropDown>
</template>

<script>
export default {
    mounted() {
        this.getCategories();
    },

    data: () => ({
        openCategory: false,
        categories: [],
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
        },

        getCategories() {
            this.$axios.$get('/api/posts/categories')
                .then(({ categories }) => {
                    this.categories.push(...categories);
                })    
        },
    },
}
</script>