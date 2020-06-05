wwLib.wwPopups.addStory('WW_TIMELINE_LIST_CUSTOM', {
    title: {
        en: 'Customiser',
        fr: 'Customise'
    },
    type: 'wwPopupForm',
    storyData: {
        fields: [
            {
                label: {
                    en: 'Icon color:',
                    fr: 'Couleur de l\'icone:'
                },
                type: 'color',
                key: '--icon-color',
                valueData: '--icon-color',
                desc: {
                    en: 'Choose a color for the list item icon',
                    fr: 'Changer le style de couleur l\'icone d\'item de liste'
                }
            },

            {
                label: {
                    en: 'Time line color:',
                    fr: 'Couleur de la timeline'
                },
                type: 'color',
                key: '--border-color',
                valueData: '--border-color',
                desc: {
                    en: 'Choose a style color for the vertical line',
                    fr: 'Changer la couleur de la ligne verticale'
                }
            }
        ]
    },
    buttons: {
        NEXT: {
            text: {
                en: 'Ok',
                fr: 'Ok'
            },
            next: false
        }
    }
});
