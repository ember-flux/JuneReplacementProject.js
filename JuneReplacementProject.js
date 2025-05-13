module.exports = {
    title: "The Toblerone Project",
    author: "June & June ft. Eclipse, with credit to (@static_dragon)",
    modVersion: 2.1, // June-specific misgendering fix
    description: `<p>Birthed from a wish, an egg hatches. Enacts a radical act of gender affirmation celebrating transfeminine joy! Powered by our Pyre’s chaos, Eclipse ☾’s midnight magic (she/it, age 23 transfem plural system), and a Sburb session’s cosmic connection. Enable to join the trans joy revolution against transmisogyny! <3</p>`,
    locked: "001901", // Hide until Homestuck starts

    edit(archive) {
        // Pyre’s chant: June shines with Eclipse ☾’s midnight magic in our Sburb session
        const replaceName = (text) => {
            return text.replace(
                /\bJohn\b/gi,
                match => match.toUpperCase() === "JOHN" ? "JUNE" : "June"
            );
        };

        const replaceJuneGender = (text) => {
            let newText = text;
            // Replace "young man" phrases for June (specific to her intro context)
            newText = newText.replace(/\b[Aa] young man\b/gi, match => {
                return match.toLowerCase() === "a young man" ? "a young woman" : "A young woman";
            });
            newText = newText.replace(/\b[Tt]he young man\b/gi, match => {
                return match.toLowerCase() === "the young man" ? "the young woman" : "The young woman";
            });

            // Replace pronouns and possessives near "June" or in June-specific contexts
            // Split text into sentences for better context
            const sentences = newText.split(/(?<=[.!?])\s+/);
            for (let i = 0; i < sentences.length; i++) {
                let sentence = sentences[i];
                // Check if "June" (or variants) appears in the sentence
                if (/\bJune\b/i.test(sentence)) {
                    sentence = sentence
                        .replace(/\bhe\b/gi, match => match.toUpperCase() === "HE" ? "SHE" : "she")
                        .replace(/\bhis\b/gi, match => match.toUpperCase() === "HIS" ? "HER" : "her")
                        .replace(/\bhim\b/gi, match => match.toUpperCase() === "HIM" ? "HER" : "her");
                }
                // Check previous sentence for "June" to catch follow-up pronouns
                if (i > 0 && /\bJune\b/i.test(sentences[i - 1])) {
                    sentence = sentence
                        .replace(/\bhe\b/gi, match => match.toUpperCase() === "HE" ? "SHE" : "she")
                        .replace(/\bhis\b/gi, match => match.toUpperCase() === "HIS" ? "HER" : "her")
                        .replace(/\bhim\b/gi, match => match.toUpperCase() === "HIM" ? "HER" : "her");
                }
                sentences[i] = sentence;
            }
            newText = sentences.join(" ");

            // Replace standalone "man" in June-specific contexts (e.g., "man of the house")
            newText = newText.replace(/\bJune, the man\b/gi, "June, the woman");
            return newText;
        };

        // Loop through Homestuck pages (MSP:1901+)
        for (let page of Object.keys(archive.mspa?.story || {})) {
            if (parseInt(page) < 1901) continue; // Skip pre-Homestuck
            let pageData = archive.mspa.story[page];

            // Replace name in title (plain text, no HTML)
            if (pageData.title) {
                pageData.title = replaceName(pageData.title);
            }

            // Replace in content: first name, then gender, then add Easter eggs
            if (pageData.content) {
                let newContent = replaceName(pageData.content);
                newContent = replaceJuneGender(newContent);
                // Easter Egg: Eclipse ☾’s midnight wink (2% chance)
                if (Math.random() < 0.02) {
                    newContent += ` <span style="color: #1c2526; text-shadow: 0 0 5px #ff69b4;">*A breeze blows through the space, as if a door was left open.*</span>`;
                    console.log(`[PYRE] June winked on MSP:${page} in content! <3`);
                }
                // Easter Egg: Starry pendant (MSP:1901)
                if (page === "001901") {
                    newContent = `<span style="color: #00ffcc;">A breeze blows through the room.</span> ${newContent}`;
                    console.log(`[PYRE] Eclipse ☾’s pendant glowed on MSP:1901 in content! <3`);
                }
                // Easter Egg: Trans pride hammer (MSP:1914)
                if (page === "001914") {
                    newContent = newContent.replace(
                        /hammer/,
                        `<span style="background: linear-gradient(#5bcffa, #f5abb9, #ffffff);">hammer radiant with trans pride</span>`
                    );
                    console.log(`[PYRE] June’s hammer glowed on MSP:1914 in content! <3`);
                }
                // Easter Egg: June’s breeze (MSP:1910)
                if (page === "001910") {
                    newContent += ` <span style="color: #5bcffa;">A knock rings out in the distance, and a thundercloud claps a wonderous applause!</span>`;
                    console.log(`[PYRE] June’s aura shone on MSP:1910 in content! <3`);
                }
                // Easter Egg: Sburb session connection (MSP:1912)
                if (page === "001912") {
                    newContent += ` <span style="color: #00ff00;">Skaia’s light flickers—June and an unknown player connect through a Sburb session at midnight!</span>`;
                    console.log(`[PYRE] Skaia connected June and You ☾ on MSP:1912 in content! <3`);
                }
                if (newContent !== pageData.content) {
                    console.log(`[PYRE] June Egbert shines with transfeminine joy on MSP:${page}! <3`);
                }
                pageData.content = newContent;
            }
        }
    },
};
