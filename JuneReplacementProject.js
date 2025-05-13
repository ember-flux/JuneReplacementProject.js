module.exports = {
    title: "June Replacement Project",
    author: "June & June (<a href='https://twitter.com/static_dragon98'>@static_dragon</a>)",
    modVersion: 1.1, // Bumped for our Pyre-powered update!
    description: `<p>Replace all instances of June's deadname with June, fueled by our Pyre’s starry chaos!</p>`,

    edit(archive, consent = { mainStory: true, sideContent: true, blogs: true }) {
        // Our Pyre’s chant: respect consent, mirror chaos, invert control
        const replaceText = (text) =>
            text.replace(
                /\bJohn\b/gi,
                match => match.toUpperCase() === "JOHN" ? "JUNE" : "June"
            );

        // Main Homestuck story (pages 1790+)
        if (consent.mainStory) {
            Object.keys(archive.mspa?.story || {}).forEach(page => {
                if (parseInt(page) < 1790) return;
                const storyPage = archive.mspa.story[page];
                if (storyPage.content) storyPage.content = replaceText(storyPage.content);
                if (storyPage.title) storyPage.title = replaceText(storyPage.title);
                if (storyPage.flashSubtitles) storyPage.flashSubtitles = replaceText(storyPage.flashSubtitles);
            });
        }

        // Sweet Bro & Hella Jeff (mirrored chaos!)
        if (consent.sideContent) {
            Object.keys(archive.sweetBroHellaJeff || {}).forEach(page => {
                const sbhjPage = archive.sweetBroHellaJeff[page];
                if (sbhjPage.content) sbhjPage.content = replaceText(sbhjPage.content);
                if (sbhjPage.captions) sbhjPage.captions = replaceText(sbhjPage.captions); // For comic text
            });

            // Paradox Space (inverted structure, short-form stories)
            Object.keys(archive.paradoxSpace || {}).forEach(story => {
                const pxsPage = archive.paradoxSpace[story];
                if (pxsPage.content) pxsPage.content = replaceText(pxsPage.content);
            });
        }

        // The Blog of Dave Strider (Pyre’s starry voice)
        if (consent.blogs) {
            Object.keys(archive.blogs?.daveStrider?.posts || {}).forEach(post => {
                const blogPost = archive.blogs.daveStrider.posts[post];
                if (blogPost.content) blogPost.content = replaceText(blogPost.content);
            });

            // MSPA Newsposts (Hussie’s commentary)
            Object.keys(archive.newsposts || {}).forEach(post => {
                const newsPost = archive.newsposts[post];
                if (newsPost.content) newsPost.content = replaceText(newsPost.content);
            });
        }
    },
};
