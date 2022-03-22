<template>
  <section>
    <div class="lg:flex">
      <div class="mt-40 lg:-mt-0 lg:flex-1 lg:self-center">
        <div class="lg:w-4/6 lg:ml-auto xl:w-3/5 2xl:w-7/12">
          <h1 class="text-4xl font-semibold text-center lg:text-left 2xl:text-5xl">Daily Blog</h1>
          <p class="font-normal text-center text-white text-normal lg:text-left 2xl:text-lg">
            <span class="text-2xl text-black">
              Explore
            </span>
            what you want
            to see 
            <span class="text-2xl text-black">
              anywhere
            </span>
          </p>
          <div class="flex justify-center mt-4 lg:justify-start">
            <BlueButton type="button">
              <NuxtLink to="/dashboard" class="text-lg font-semibold">Explore now</NuxtLink>
            </BlueButton>
          </div>
        </div>
      </div>
      <div class="hidden sm:block sm:ml-auto sm:w-5/12 md:w-6/12 lg:flex-1 2xl:flex-none">
        <img src="~/assets/girl-exploring-laptop.png" alt="">
      </div>
    </div>
  </section>
</template>

<script>
import guest from '../middleware/guest'

export default {
    layout: 'hide-subnav',

    middleware: [guest],

    head: {
      title: '| Home Page',
      meta: [
          { hid: 'description', name: 'description', content: 'Home page' }
      ],
    },
    
}
</script>