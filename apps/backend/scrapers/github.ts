import axios from "axios";

export async function scrapeGithub(username: string) {

    const userRepos = await axios.get(`https://api.github.com/users/${username}/repos`, {
        proxy: {
            host: "45.3.52.230",
            port: 3129,
            auth: { 
                username: '4nxhpawrhkg6',
                password: 'uk6svdsiz75iwty'
            }
        }
});

    return userRepos.data.map((x:any) => ({
        description: x.description,
        name: x.name,
        fullName: x.full_name,
        starCount: x.stargazers_count
    }))
}