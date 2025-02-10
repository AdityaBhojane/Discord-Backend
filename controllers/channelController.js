import { deleteChannelService, getChannelService, updateChannelService } from "../services/channelServcice.js";



export const updateChannelController = async (req, res) => {
    try {
        const { channelId } = req.params;
        const channelData = req.body;
        const updatedChannel = await updateChannelService(channelId, channelData);
        return res.status(200).json(updatedChannel);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getChannelController = async (req, res) => {
    try {
        const { channelId } = req.params;
        const getChannel = await getChannelService(channelId);
        return res.status(200).json(getChannel);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const deleteChannelController = async (req, res) => {
    try {
        const { channelId } = req.params;
        const deletedChannel = await deleteChannelService(channelId);
        return res.status(200).json(deletedChannel);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}