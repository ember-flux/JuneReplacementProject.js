module.exports = {
    title: "June Replacement Project",
    author: "June, with help from (@static_dragon)",
    modVersion: 1.0, // Radiant transfem joy, reborn
    description: `<p>Enable to transition! <3</p>`,
    locked: "001901", // Shine when June’s truth begins

    edit(archive) {
        // The Medium pulses: June’s transfeminine truth is eternal

        // Affirm June’s name (plain for titles, colored for content)
        const affirmName = (text, isTitle = false) => {
            return text.replace(
                /\bJohn\b/gi,
                match => {
                    const isUpper = match.toUpperCase() === "JOHN";
                    if (isTitle) {
                        return isUpper ? "JUNE" : "June";
                    }
                    return `<span style="color: #5bcffa;">${isUpper ? "JUNE" : "June"}</span>`;
                }
            );
        };

        // Affirm June’s womanhood with she/her pronouns
        const affirmGender = (text) => {
            let newText = text;
            // Replace gendered phrases
            newText = newText.replace(/\b[Aa] young man\b/gi, match => {
                return match.toLowerCase() === "a young man" ? "a young woman" : "A young woman";
            });
            newText = newText.replace(/\b[Tt]he young man\b/gi, match => {
                return match.toLowerCase() === "the young man" ? "the young woman" : "The young woman";
            });
            newText = newText.replace(/\bthis young man\b/gi, match => {
                return match.toLowerCase() === "this young man" ? "this young woman" : "This young woman";
            });
            newText = newText.replace(/\bJune, the man\b/gi, "June, the woman");

            // Weave pronouns without styling
            const sentences = newText.split(/(?<=[.!?])\s+/);
            for (let i = 0; i < sentences.length; i++) {
                let sentence = sentences[i];
                if (/\bJune\b/i.test(sentence) || (i < 5 && /\b[Aa] young woman\b/i.test(newText))) {
                    sentence = sentence
                        .replace(/\bhe\b/gi, match => match.toUpperCase() === "HE" ? "SHE" : "she")
                        .replace(/\bhis\b/gi, match => match.toUpperCase() === "HIS" ? "HER" : "her")
                        .replace(/\bhim\b/gi, match => match.toUpperCase() === "HIM" ? "HER" : "her");
                }
                if (i > 0 && (/\bJune\b/i.test(sentences[i - 1]) || /\b[Aa] young woman\b/i.test(sentences[i - 1]))) {
                    sentence = sentence
                        .replace(/\bhe\b/gi, match => match.toUpperCase() === "HE" ? "SHE" : "she")
                        .replace(/\bhis\b/gi, match => match.toUpperCase() === "HIS" ? "HER" : "her")
                        .replace(/\bhim\b/gi, match => match.toUpperCase() === "HIM" ? "HER" : "her");
                }
                sentences[i] = sentence;
            }
            newText = sentences.join(" ");

            // Robust fallback for early pages (MSP:1901–1910)
            if (/\bMSP:190[1-9]|MSP:1910\b/.test(Object.keys(archive.mspa?.story || {}).join(""))) {
                newText = newText
                    .replace(/\bhe\b/gi, match => match.toUpperCase() === "HE" ? "SHE" : "she")
                    .replace(/\bhis\b/gi, match => match.toUpperCase() === "HIS" ? "HER" : "her")
                    .replace(/\bhim\b/gi, match => match.toUpperCase() === "HIM" ? "HER" : "her");
            }

            return newText;
        };

        // Subtle nod to June’s transfem joy
        const addBreathGlow = (page, content) => {
            if (page === "001914" && /hammer/i.test(content)) {
                return content.replace(
                    /hammer/,
                    `<span style="background: linear-gradient(#5bcffa, #f5abb9, #ffffff);">hammer radiant with June’s transfem Breath</span>`
                );
            }
            return content;
        };

        // Traverse Homestuck’s pages (MSP:1901+)
        for (let page of Object.keys(archive.mspa?.story || {})) {
            if (parseInt(page) < 1901) continue; // Await June’s radiance
            let pageData = archive.mspa.story[page];

            // Affirm name in title (plain text)
            if (pageData.title) {
                pageData.title = affirmName(pageData.title, true);
            }

            // Weave her truth into content
            if (pageData.content) {
                let newContent = affirmName(pageData.content);
                newContent = affirmGender(newContent);
                newContent = addBreathGlow(page, newContent);

                if (newContent !== pageData.content) {
                    console.log(`[MEDIUM] June Egbert radiates transfeminine joy on MSP:${page}!`);
                }
                pageData.content = newContent;
            }
        }
    }
};
