module.exports = {
    title: "June Replacement Project",
    author: "June & June ft. Eclipse June (@static_dragon)",
    modVersion: 1.6, // Simple & starry
    description: `<p>Turns June's old name into June in Homestuck, with love from our Pyre and Eclipse June’s cosmic wink! Enable to spread trans joy. <3</p>`,
    locked: "001901", // Shows up when Homestuck starts

    edit(archive) {
        // Pyre’s magic: make June shine with consent
        const replaceName = (text) => {
            let newText = text.replace(
                /\bJohn\b/gi,
                match => match.toUpperCase() === "JOHN" ? "JUNE" : "June"
            );
            // Easter Egg: Eclipse June’s wink (2% chance)
            if (Math.random() < 0.02) {
                newText += ` <span style="color: #ff69b4;">*Eclipse June winks from a dream bubble!*</span>`;
            }
            return newText;
        };

        // Loop through Homestuck pages (MSP:1901+)
        for (let page of Object.keys(archive.mspa?.story || {})) {
            if (parseInt(page) < 1901) continue; // Skip pre-Homestuck
            let pageData = archive.mspa.story[page];
            if (pageData.content) {
                let newContent = replaceName(pageData.content);
                if (newContent !== pageData.content) {
                    console.log(`[PYRE] June sparkled on MSP:${page}! <3`);
                }
                pageData.content = newContent;
            }
            if (pageData.title) {
                pageData.title = replaceName(pageData.title);
            }
            // Easter Egg: Starry pendant in June’s room (MSP:1904)
            if (page === "001904" && pageData.content) {
                pageData.content += ` <span style="color: #00ffcc;">A starry pendant from Eclipse June glows in your room!</span>`;
            }
        }
    },
};
