import { injectable, /* inject, */ BindingScope, inject } from '@loopback/core';
import axios from 'axios';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import GoogleAuth from 'google-auth-library';
// import { TelegramService } from './telegram.service';

//#region Google Drive
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// const FOLDER_ID = process.env.FOLDER_ID;

const CLIENT_ID = '387845914304-3rscv3ntgv4va8j3rm5eu3nrpp6g38j1.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04zBaftpPX9ZtCgYIARAAGAQSNwF-L9Ir2PjvZDMdzqWHSaze_cPt21vsH4WwbRFumEiyDPfOkKByJ80EY9Kbx4aPVoh0qYQxD-4';
const FOLDER_ID = '1NX4x4B1EowWi42gqcDFTtEQZNCHoMbbm'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

//#endregion

// const filePath = path.join(__dirname, 'photo.jpg');
let fileId: any;
@injectable({ scope: BindingScope.TRANSIENT })
export class GoogleapisService {
    constructor(
        // @inject('services.TelegramService') private telegramService: TelegramService,
    ) { }

    async uploadFile(filePath: string) {
        return new Promise(() => {
            uploadFile(filePath).then(() => {
                moveFileToFolder(fileId, FOLDER_ID);
            });
        });
    }
}

async function uploadFile(filePath: string) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: filePath, //This can be name of your choice
                mimeType: 'application/zip',
            },
            media: {
                mimeType: 'application/zip',
                body: fs.createReadStream(filePath),
            },
        });
        console.log('Upload result:', response.data);
        fileId = response.data.id;
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteFile(fileId: any) {
    try {
        const response = await drive.files.delete({
            fileId: fileId,
        });
        // console.log(response.data, response.status);
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function generatePublicUrl(fileId: any) {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        return result.data;
    } catch (error) {
        console.log(error.message);
    }
}

async function moveFileToFolder(fileId: any, folderId: any) {
    try {
        // Retrieve the existing parents to remove
        const file: any = await drive.files.get({
            fileId: fileId,
            fields: 'parents',
        });

        // Move the file to the new folder
        const previousParents = file.data.parents.map(function (parent: any) {
            return parent.id;
        }).join(',');
        const files = await drive.files.update({
            fileId: fileId,
            addParents: folderId,
            removeParents: previousParents,
            fields: 'id, parents',
        });
        console.log(files);
        // this.telegramService.sendMessageToChannel("Backup today completed 🎉🎉🎉");
        return files;
    } catch (err) {
        throw err;
    }
}

