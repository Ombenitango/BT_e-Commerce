import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	checkout: async ({request}) => {
        const data= await request.formData();
		console.log(data);
	},
};
