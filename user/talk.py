import talkey
tts = talkey.Talkey(
    preferred_languages = ['en', 'af', 'el', 'fr'],
    espeak = {
        'languages': {
            'en': {
                'voice': 'english-mb-en1',
                'words_per_minute': 130
            },
        }
    })
tts.say('Old McDonald had a farm')