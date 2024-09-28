import * as contentful from 'contentful'

const client = contentful.createClient({
    space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.VUE_APP_CONTENTFUL_DELIVERY_API
});

export default client