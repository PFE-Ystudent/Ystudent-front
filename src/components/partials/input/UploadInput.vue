<template>
    <label :for="id"
           class="w-full">
        <div class="flex w-full h-8 cursor-pointer"
             tabindex="0"
             role="button"
             @keydown.enter="$refs.file.click()">
            <div class="h-full flex items-center justify-center text-white bg-primary border border-primary rounded-l-md py-1 px-2">
                <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
            </div>
            <div class="file-upload-field w-full h-8 flex border rounded-r-md shadow border-zinc-300 focus:border-zinc-600 p-1 overflow-x-scroll text-nowrap"
                 :class="files.length ? 'text-black' : 'text-zinc-300'">
                <div v-if="files.length"
                     class="flex gap-1">
                    <div v-for="(file, index) in files"
                         :key="index"
                         class="flex items-center bg-primary rounded-lg text-sm text-white p-1">
                        <button class="p-1"
                                @click="deleteFile($event, index)">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                        <div>
                            {{ file.name }}
                        </div>
                    </div>
                </div>
                <template v-else>
                    Fichier
                </template>
            </div>
        </div>
        <div class="text-rose-500 text-xs h-4">
            <div v-for="(error, index) in errors"
                 :key="index">
                {{ error }}
            </div>
        </div>
        <input :id="id"
               ref="file"
               type="file"
               class="hidden"
               :accept="accept"
               :multiple="multiple"
               @change="fileChange">
    </label>
</template>

<script>
export default {
    name: 'UploadInput',
    props: {
        id: {
            type: String,
            required: true
        },
        accept: {
            type: String,
            default: null
        },
        multiple: {
            type: Boolean,
            default: false
        },
        errors: {
            type: Array,
            default: null
        }
    },
    data () {
        return {
            files: []
        };
    },
    methods: {
        fileChange (e) {
            const target = e.target;
            if (target && target.files) {
                this.files = target.files;
            }
            this.$emit('select-files', this.files);
        },
        deleteFile (e, removeIndex) {
            const newFiles = [];
            for (let index = 0; index < this.files.length; index++) {
                if (index !== removeIndex) {
                    newFiles.push(this.files[index]);
                }
            }
            this.files = newFiles;
            e.preventDefault();
            this.$emit('select-files', this.files);
        }
    },
};
</script>

<style scoped>
.shadow {
    box-shadow: inset 0 1px 3px #ddd;
}

.file-upload-field::-webkit-scrollbar {
  display: none;
}
.file-upload-field {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>