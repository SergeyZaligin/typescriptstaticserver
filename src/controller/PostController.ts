import { NextFunction, Request, Response } from 'express';
import { Post } from '../models/Post';

export class PostController {

  public async all(
    _: Request,
    res: Response,
  ): Promise<Response | void> {
   res.render('index');
  }

  public async one(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { slug } = req.params;
    try {
      const data = await Post.findOne({ slug });
      if (!data) {
        throw new Error('Post not found');
      }
      return res.status(200).json({ data, message: 'success' });
    } catch (error) {
      return next(error.message);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const {
      title,
      slug,
      content,
      featuredImage,
      category,
      published,
    } = req.body;
    try {
      const post = await new Post({
        title,
        slug,
        content,
        featuredImage,
        category,
        published,
      });
      const data = await post.save();
      res.status(201).json({ data, message: 'success' });
    } catch (error) {
      return next(error.message);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { slug } = req.body;
    try {
      const data = await Post.findOneAndUpdate({ slug }, req.body);
      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      return next(error.message);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { slug } = req.body;
    try {
      const data = await Post.findOneAndRemove({ slug });
      return res.status(204).json({ data, message: 'success' });
    } catch (error) {
      return next(error.message);
    }
  }
}
