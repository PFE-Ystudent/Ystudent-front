<template>
    <div>
        <div class="relative min-h-screen">
            <div class="absolute w-full"
                 style="z-index: -1;">
                <img src="@/assets/bg.png"
                     class="w-full h-screen">
            </div>
            <div class="h-16">
                <div class="w-full px-4 h-16 bg-primary border-b-2 border-primary fixed"
                     style="z-index: 100;">
                    <div class="text-3xl text-white font-semibold h-full flex items-center">
                        YStudent
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