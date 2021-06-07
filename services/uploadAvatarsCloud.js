const fs = require('fs/promises');

class Upload {
  constructor(uploadCloud) {
    this.uploadCloud = uploadCloud;
  }

  async saveAvatarToCloud(pathFile, userIdImg) {
    const {
      public_id: publicId,
      secure_url: secureURL,
    } = await this.uploadCloud(pathFile, {
      public_id: userIdImg?.replace('Photo/', ''),
      folder: 'Photo',
      transformation: { width: 250, crop: 'pad' },
    });
    await this.deleteTemporaryFile(pathFile);
    return { userIdImg: publicId, avatarURL: secureURL };
  }

  async deleteTemporaryFile(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = Upload;
