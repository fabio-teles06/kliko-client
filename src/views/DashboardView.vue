<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <div class="stats">
            <div class="stat">
                <h2>Total Links</h2>
                <p>{{ totalLinks }}</p>
            </div>
            <div class="stat">
                <h2>Total Clicks</h2>
                <p>{{ totalClicks }}</p>
            </div>
        </div>
        <div class="shorten-link">
            <h2>Shorten a New Link</h2>
            <input v-model="newLink" type="text" placeholder="Enter URL" />
            <button @click="shortenLink">Shorten</button>
        </div>
        <div class="links-list">
            <h2>Your Links</h2>
            <ul>
                <li v-for="link in links" :key="link.id">
                    <a :href="link.shortUrl" target="_blank">{{ link.shortUrl }}</a>
                    <p>Original: {{ link.originalUrl }}</p>
                    <p>Clicks: {{ link.clicks }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            totalLinks: 0,
            totalClicks: 0,
            newLink: '',
            links: [],
        };
    },
    methods: {
        shortenLink() {
            if (!this.newLink) return;
            const shortUrl = `https://short.ly/${Math.random().toString(36).substr(2, 5)}`;
            const newLinkData = {
                id: Date.now(),
                originalUrl: this.newLink,
                shortUrl,
                clicks: 0,
            };
            this.links.push(newLinkData);
            this.totalLinks++;
            this.newLink = '';
        },
    },
};
</script>

<style scoped>
.dashboard {
    padding: 20px;
    font-family: Arial, sans-serif;
}
.stats {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}
.stat {
    background: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
.shorten-link {
    margin-bottom: 20px;
}
.shorten-link input {
    padding: 5px;
    margin-right: 10px;
}
.links-list ul {
    list-style: none;
    padding: 0;
}
.links-list li {
    margin-bottom: 10px;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
}
</style>