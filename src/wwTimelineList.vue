<!-- This is a Vue.js single file component. -->
<!-- Check the Vue.js doc here :  -->
<!-- https://vuejs.org/v2/guide/ -->

<!-- This is your HTML -->
<template>
  <div class="ww-section-timeline-list">
    <div class="section-container">
      <!-- wwManager:start -->
      <wwSectionEditMenu
              v-bind:sectionCtrl="sectionCtrl"
      ></wwSectionEditMenu>
      <!-- wwManager:end -->

      <wwContentList
              :list="wwObject.data.items"
              :edit-mode="editMode"
              :new-item="getNewItem"
              :on-list-changed="onListChanged"
              :list-class="'list-container'"
              :item-wrapper-class="'list-item-wrapper'"
      >
        <template #row="{item}">
          <div class="list-bullet">
            <div class="list-bullet-icon">
              <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="12"
                      height="12"
                      rx="4"/>
              </svg>
            </div>
          </div>
          <div class="list-item-text">
            <wwObject
                    :ww-object="item.text"
                    ww-category="text"
            ></wwObject>
          </div>
        </template>
      </wwContentList>
    </div>
  </div>
</template>

<script>
    const wwo = window.wwLib.wwObject;
    const wwu = window.wwLib.wwUtils;

    import wwContentList from './content-list.vue';

    export default {
        name: '__COMPONENT_NAME__',
        components: {
            wwContentList
        },
        props: {
            wwObjectCtrl: Object,
            wwAttrs: {
                type: Object,
                default: {}
            }
        },
        computed: {
            wwObject () {
                return this.wwObjectCtrl.get();
            },
            /* wwManager:start */
            editMode () {
                return this.wwObjectCtrl.getSectionCtrl().getEditMode() === 'CONTENT';
            }
            /* wwManager:end */
        },
        created () {
            this.init();
            this.$emit('ww-loaded', this);
        },
        methods: {
            init () {
                let needUpdate = false;

                this.wwObject.data = this.wwObject.data || {};

                if (!this.wwObject.data.items) {
                    this.wwObject.data.items = [this.getNewItem()];
                    needUpdate = true;
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
            onListChanged () {
                this.wwObjectCtrl.update(this.wwObject);
            }
        }
    };
</script>

<style lang="scss"
       scoped>
  .ww-section-timeline-list {
    .section-container {
      width: 1200px;
      margin: auto;
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    .list-container {
      position: relative;
      max-width: 576px;
      padding: 0;
      margin: auto;
      list-style-type: none;
    }

    .list-container::v-deep {
      .list-item-wrapper {
        --item-margin-bottom: 16px;
        --text-size: 1em;
        --border-width: 4px;
        --border-offset: 4px;
        --border-color: #dadada;
        --icon-size: 12px;
        --icon-color: #49b9b3;

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
          bottom: calc(
                  -1 * var(--text-size) - var(--item-margin-bottom) + var(--icon-size) + var(--border-offset) + 2px
          );
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
