import express from 'express';
import Link from '../models/Link';
import {LinkMutation} from '../types';

const linksRouter = express.Router();

const generateShortUrl = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const length = 7;
  let shortUrl = '';
  for (let i = 0; i < length; i++) {
    shortUrl += characters[Math.floor(Math.random() * characters.length)];
  }
  return shortUrl;
};

linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const {shortUrl} = req.params;
    const link = await Link.findOne({shortUrl});
    if (!link) {
      return res.status(404).json({error: 'Link not found'});
    }
    res.status(301).redirect(link.originalUrl);
  } catch (error) {
    next(error);
  }
});

linksRouter.post('/links', async (req, res, next) => {
  try {
    const shortUrl = generateShortUrl();
    const linkMutation: LinkMutation = {
      originalUrl: req.body.originalUrl,
      shortUrl,
    };
    const link = new Link(linkMutation);
    await link.save();

    return res.send(link);
  } catch (error) {
    next(error);
  }
});

export default linksRouter;