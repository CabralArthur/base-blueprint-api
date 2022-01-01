const filesToConvert = [
    {
        posts: [{
            "id": 0,
            "title": "First post of the year!",
            "content": "Happy new year!",
            "author_id": 0,
            "author_name": "Arthur Cabral"
        }],
    },
    {
        users: [{
            "id": 46,
            "first_name": "Farrand",
            "last_name": "Connaughton",
            "email": "fconnaughton19@xinhuanet.com",
            "avatar": "https://robohash.org/atquilaboriosam.png?size=50x50&set=set1",
            "gender": "Male",
            "born": "12/3/1996"
        }]
    }
];

const result = filesToConvert.reduce((previous, current) => {
    previous = {
        ...previous,
        ...current
    }

    console.log({current}, 'current');
    console.log({...current}, '...previous')
    return previous;
}, {});
