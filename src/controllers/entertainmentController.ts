import { logger } from "config";
import { NextFunction, Request, Response } from "express";
import Entertainment from "models/Entertainment";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, thumbnail, year, category, rating, isBookmarked, isTrending } =
    req.body;

  try {
    const newEntertainment = new Entertainment({
      title,
      thumbnail,
      year,
      category,
      rating,
      isBookmarked,
      isTrending,
    });

    await newEntertainment.save();

    logger.info(`New entertainment create: ${title}`);

    res.status(201).json({ message: "Entertainment created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getEntertainament = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.query.category;

    let entertainment;

    if (category === "movie") {
      entertainment = await Entertainment.find({ category: "Movie" });
    } else if (category === "serie") {
      entertainment = await Entertainment.find({ category: "TV Series" });
    } else {
      entertainment = await Entertainment.find();
    }

    res.status(201).json(entertainment);
  } catch (error) {
    next(error);
  }
};

export const getCategory = async () => {};

export const getBookmark = async () => {};
