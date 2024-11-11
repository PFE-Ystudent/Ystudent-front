<template>
    <div class="whitespace-pre-line break-words">
        {{ displayableContent }}<span v-if="isExtendable && !isExtended" class="text-zinc-500">...</span>
        <div v-if="isExtendable" @click="isExtended = !isExtended" class="mt-1 text-zinc-400 text-xs hover:underline cursor-pointer w-min text-nowrap">
            Voir {{isExtended ? 'moins' : 'plus'}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExtendableContent',
    props: {
        content: {
            type: String,
            required: true
        },
        characterLimit: {
            type: Number,
            default: 256
        },
        lineLimit: {
            type: Number,
            default: 4
        }
    },
    data() {
        return { isExtended: false }
    },
    computed: {
        displayableContent () {
            if (this.isExtended || !this.isExtendable) {
                return this.content;
            }
            if (this.characterExceeded) {
                let splitedContent = this.content.slice(0, this.characterLimit)
                if (splitedContent[this.characterLimit - 1].match(/[a-zA-Z-_]/)) {
                    const nextSpace = this.content.indexOf(' ', this.characterLimit - 1)
                    if (nextSpace !== -1 && nextSpace - this.characterLimit < 12) {
                        splitedContent = this.content.slice(0, nextSpace)
                    }
                }
                return splitedContent
            }
            return this.content.split('\n').slice(0, this.lineLimit).join('\n')
        },
        characterExceeded () {
            return this.content.length >= this.characterLimit + 32
        },
        lineExceeded () {
            return this.content.split('\n').length > this.lineLimit
        },
        isExtendable () {
            return this.lineExceeded || this.characterExceeded
        }
    }
}
</script>

<style scoped>

</style>