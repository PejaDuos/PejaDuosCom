const PejaBananaProfileURLContent = 'https://gamebanana.com/apiv11/Member/2342920/SubFeed?_nPage=1&_nPerpage=10';
fetch(PejaBananaProfileURLContent)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network Error!' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const ModsCount = data._aMetadata._nRecordCount;
        const PejaModsURL = `https://gamebanana.com/apiv11/Member/2342920/SubFeed?_nPage=1&_nPerpage=${ModsCount}`;
        return fetch(PejaModsURL);
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network Error!' + response.statusText);
        }
        return response.json();
    })
    .then(async data => {
        const ModsCount = data._aMetadata._nRecordCount;
        const ModsPerPage = data._aMetadata._nPerpage;
        console.log('Mods Count:', ModsCount, 'Records count:', ModsPerPage);

        for (let nMod = 0; nMod < ModsCount; nMod++) {
            let ModID = data._aRecords[nMod]._idRow;
            let ModURL = `https://gamebanana.com/apiv11/Mod/${ModID}/ProfilePage`;
            
            try {
                const response = await fetch(ModURL);
                if (!response.ok) {
                    throw new Error('Network Error Occupated while requesting the', ModURL, ':', response.statusText);
                }
                const content = await response.json();

                const description = content._sDescription;
                console.log(data._aRecords[nMod]._sName, ': ', description);

                const date = new Date(content._tsDateAdded * 1000);
                const releaseDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear())}`
                console.log(releaseDate); // Пример вывода: "30.03.24"

                const thumbnailURL = `https://images.gamebanana.com/img/ss/mods/${content._aPreviewMedia._aImages[0]._sFile}`;
                console.log(thumbnailURL);

                // const InstantDownloadURL = `everest:https://gamebanana.com/mmdl/${content._aFiles[0]._idRow},Mod,${ModID}`;
                const InstantDownloadURL = content._aFiles[0]._aModManagerIntegrations[0]._sDownloadUrl;
                console.log(InstantDownloadURL);

                const videolink = content._aEmbeddedMedia[0];
                console.log(videolink);
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
    })
    .catch(error => {
        console.error("Error:", error);
    })