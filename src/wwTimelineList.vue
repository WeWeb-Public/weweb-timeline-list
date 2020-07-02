<!-- This is a Vue.js single file component. -->
<!-- Check the Vue.js doc here :  -->
<!-- https://vuejs.org/v2/guide/ -->

<!-- This is your HTML -->
<template>
    <div class="ww-timeline-list" ref="root">
        <wwContentList :list="wwObject.data.items" :edit-mode="editMode" :new-item="getNewItem" :on-list-changed="onListChanged" :list-class="'list-container'" :item-wrapper-class="'list-item-wrapper'">
            <template #row="{item}">
                <div class="list-bullet">
                    <div class="list-bullet-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="12" height="12" rx="4" />
                        </svg>
                    </div>
                </div>
                <div class="list-item-text">
                    <wwObject :ww-object="item.text" ww-category="text"></wwObject>
                </div>
            </template>
        </wwContentList>
    </div>
</template>

<script>
const wwo = window.wwLib.wwObject;
const wwu = window.wwLib.wwUtils;

/* wwManager:start */
import './story';
/* wwManager:end */

import wwTimelineListContentList from './content-list.vue';

export default {
    name: '__COMPONENT_NAME__',
    components: {
        wwTimelineListContentList
    },
    props: {
        wwObjectCtrl: Object,
        wwAttrs: {
            type: Object,
            default: {}
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        /* wwManager:start */
        editMode() {
            return this.wwObjectCtrl.getSectionCtrl().getEditMode() === 'CONTENT';
        }
        /* wwManager:end */
    },
    created() {
        this.init();
    },
    mounted() {
        this.applyCustomisation(this.wwObject.data.styles);
    },
    methods: {
        init() {
            let needUpdate = false;
            this.wwObject.data = this.wwObject.data || {};

            if (!this.wwObject.data.items) {
                this.wwObject.data.items = [this.getNewItem()];
                needUpdate = true;
            }
            if (this.wwObject.data.styles) {
                this.applyCustomisation(this.wwObject.data.styles);
            } else {
                this.wwObject.data.styles = {};
            }
            if (needUpdate) {
                this.wwObjectCtrl.update(this.wwObject);
            }
        },
        getNewItem: () => ({
            uniqueId: wwu.getUniqueId(),
            text: wwo.getDefault({
                type: 'ww-text'
            })
        }),
        onListChanged(items) {
            this.wwObject.data.items = items;
            this.wwObjectCtrl.update(this.wwObject);
        },
        applyCustomisation(values) {
            Object.keys(values).forEach(key => {
                const value = values[key];
                if (value !== '') {
                    this.wwObject.data.styles[key] = value;
                    this.$refs.root.style.setProperty(key, value);
                }
            });
            this.wwObjectCtrl.update(this.wwObject);
        },
        /* wwManager:start */
        async edit() {
            this.wwObjectCtrl.update(this.wwObject);
            const options = {
                firstPage: 'WW_TIMELINE_LIST_CUSTOM',
                data: {
                    wwObject: this.wwObject
                }
            };
            const values = await wwLib.wwPopups.open(options);
            this.wwObjectCtrl.update(this.wwObject);
            this.applyCustomisation(values);
        }
        /* wwManager:end */
    }
};
</script>

<style lang="scss" scoped>
.ww-timeline-list {
    --item-margin-bottom: 16px;
    --border-width: 4px;
    --border-offset: 4px;
    --border-color: #dadada;
    --icon-size: 12px;
    --icon-color: #49b9b3;
    --text-size: 1em;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .list-container {
        position: relative;
        width: 100%;
        padding: 0;
        margin: auto;
        list-style-type: none;
    }

    .list-container::v-deep {
        .list-item-wrapper {
            position: relative;
            display: flex;
            align-items: flex-start;
            min-height: calc(2 * var(--text-size));
            margin: 0 0 var(--item-margin-bottom);

            &:not(:last-child):before {
                display: block;
                position: absolute;
                background-color: var(--border-color);
                content: '';
                width: var(--border-width);
                border-radius: 2px;
                top: calc(var(--icon-size) + var(--border-offset) + 1px);
                bottom: calc(-1 * var(--text-size) - var(--item-margin-bottom) + var(--icon-size) + var(--border-offset) + 2px);
                left: calc(0.5 * var(--text-size) - 0.5 * var(--border-width));
            }
        }

        .list-bullet {
            display: block;
            width: var(--text-size);
            height: var(--text-size);
            line-height: var(--text-size);
            margin-left: 0;
            margin-right: 12px;

            &-icon {
                display: block;
                width: var(--icon-size);
                height: var(--icon-size);
                margin-left: auto;
                margin-right: auto;

                svg > rect {
                    fill: var(--icon-color);
                }
            }
        }

        .list-item-text {
            font-size: var(--text-size);
            line-height: var(--text-size);
        }
    }
}
</style>
