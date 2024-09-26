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
      entertainment = await Entertainment.find({
        category: "Movie",
        isTrending: false,
      });
    } else if (category === "serie") {
      entertainment = await Entertainment.find({
        category: "TV Series",
        isTrending: false,
      });
    } else if (category === "trending") {
      entertainment = await Entertainment.find({ isTrending: true });
    } else {
      entertainment = await Entertainment.find({
        isTrending: false,
      });
    }

    res.status(201).json(entertainment);
  } catch (error) {
    next(error);
  }
};

export const changeBookmarkState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id, isBookmarked, key } = req.body;
  try {
    await Entertainment.findByIdAndUpdate(
      { _id },
      { isBookmarked: !isBookmarked }
    );

    const category = req.query.category;

    let entertainment;

    if (key) {
      if (category === "movie") {
        entertainment = await Entertainment.find({
          category: "Movie",
          isBookmarked: true,
        });
      } else if (category === "serie") {
        entertainment = await Entertainment.find({
          category: "TV Series",
          isBookmarked: true,
        });
      }
    } else {
      if (category === "movie") {
        entertainment = await Entertainment.find({
          category: "Movie",
          isTrending: false,
        });
      } else if (category === "serie") {
        entertainment = await Entertainment.find({
          category: "TV Series",
          isTrending: false,
        });
      } else if (category === "trending") {
        entertainment = await Entertainment.find({ isTrending: true });
      } else {
        entertainment = await Entertainment.find({
          isTrending: false,
        });
      }
    }

    res.status(201).json(entertainment);
  } catch (error) {
    next(error);
  }
};

export const getBookmarked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.query.category;

    let entertainment;

    if (category === "movie") {
      entertainment = await Entertainment.find({
        category: "Movie",
        isBookmarked: true,
      });
    } else if (category === "serie") {
      entertainment = await Entertainment.find({
        category: "TV Series",
        isBookmarked: true,
      });
    }

    res.status(201).json(entertainment);
  } catch (error) {
    next(error);
  }
};
