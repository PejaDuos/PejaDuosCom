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
        let ModsDIV = '';
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

                const ModName = data._aRecords[nMod]._sName;
                // const Description = content._sDescription;
                const date = new Date(content._tsDateAdded * 1000);
                const ReleaseDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear())}`
                const Likes = content._nLikeCount;
                const Downloads = content._nDownloadCount;
                const ThumbnailURL = `https://images.gamebanana.com/img/ss/mods/${content._aPreviewMedia._aImages[0]._sFile}`;
                const ModBananaURL = content._sProfileUrl;

                let Description;
                if (content._sDescription) {
                    Description = content._sDescription;
                } else {Description = 'No description';}

                let InstantDownloadURL;
                if (content._aFiles[0]._aModManagerIntegrations[0]) {
                    InstantDownloadURL = content._aFiles[0]._aModManagerIntegrations[0]._sDownloadUrl;
                } else {InstantDownloadURL = content._aFiles[0]._sDownloadUrl;}
                
                let VideoURL;
                if (content._aEmbeddedMedia?.[0]) {
                    VideoURL = content._aEmbeddedMedia[0];
                } else {VideoURL = 'novid';}

                console.log(ModName, ': ', Description);
                console.log(ReleaseDate); // output format 30.03.24
                console.log(ThumbnailURL);
                console.log(InstantDownloadURL);
                console.log(ModBananaURL);
                console.log(VideoURL);
                // some mod can just not have VideoURL or InstantDownloadURL

                const ModDIV = `<div class="MapBox ModNum${nMod}">
                    <div class="flextest">
                        <img class="tablepicture" src="${ThumbnailURL}"/>
                        <div class="tablecontent">
                            <h2>${ModName}</h2>
                            <p>${Description}</p>
                            <div class="subscriptions">
                                <li>${ReleaseDate}</li>
                                <li>${Likes} Likes</li>
                                <li>${Downloads} Loads</li>
                            </div>
                        </div>
                    </div>
                    <div class="tablebuttons">
                        <a href="${InstantDownloadURL}" class="downloadbutt">
                            <img src="Buttons/DownloadButton.png"/>
                        </a>
                        <a href="${ModBananaURL}" class="bananabutt">
                            <img src="Buttons/GamebananaButton.png"/>
                        </a>
                        ${VideoURL!='novid' ? `<a href="${VideoURL}}" class="videobutt">
                            <img src="Buttons/VideoButton.png"/>
                            <img src="Buttons/VideoButtonAnim.png"/>
                            <img src="Buttons/VideoButtonAnim.png"/>
                        </a>` : ``}                   
                    </div>
                </div>`;


                // const ModsColumn = document.querySelector('div.MapsColumn');
                // ModsColumn.innerHTML += ModDIV;
                // const ModAnimPlayer = document.querySelector(`div.ModNum${nMod}`);
                // ModAnimPlayer.style.animation = 'ModLoaded 1s ease-in-out forwards';
                ModsDIV+= ModDIV;
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        const ModsColumn = document.querySelector('div.MapsColumn');
        ModsColumn.innerHTML += ModsDIV;
        DownloadButtonListener();
        BananaButtonListener();
        VideoButtonListener();
    })
    .catch(error => {
        console.error("Error:", error);
    })