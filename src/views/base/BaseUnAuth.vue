<template>
    <div>
        <div class="relative min-h-screen">
            <div class="absolute w-full"
                 style="z-index: -1;">
                <img src="@/assets/bg.png"
                     alt=""
                     class="w-full h-screen">
            </div>
            <div class="h-16">
                <div class="w-full px-4 h-16 bg-primary border-b-2 border-primary fixed flex items-center gap-4"
                     style="z-index: 100;">
                    <div>
                        <img src="/logo-dark.png"
                             class="w-[54px] h-[54px] cursor-pointer"
                             alt="Logo">
                    </div>
                    <div class="text-3xl text-white font-semibold h-full flex items-center">
                        NeoCap
                    </div>
                </div>
            </div>
            <div class="mt-16">
                <router-view />
            </div>
        </div>
        <div class="relative mt-2">
            <div class="absolute w-full"
                 style="z-index: -1;">
                <img src="@/assets/footer.png"
                     alt=""
                     class="w-full">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BaseUnAuth'
};
</script>