import { rest } from "msw";
import {
  peopleById,
  peopleFirstPage,
  peopleByName,
  speciesByName,
  vehiclesById,
  filmsById,
  starshipsById,
} from "./data";

export const apiUrl = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.get(`${apiUrl}/people`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const search = query.get("search");

    return res(ctx.status(200), ctx.json(search ? peopleByName[search] : peopleFirstPage));
  }),
  rest.get(`${apiUrl}/people/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(peopleById[id]));
  }),
  rest.get(`${apiUrl}/species`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const search = query.get("search");

    return res(ctx.status(200), ctx.json(search ? speciesByName[search] : peopleFirstPage));
  }),
  rest.get(`${apiUrl}/species/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(`${apiUrl}/vehicles/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(vehiclesById[id]));
  }),
  rest.get(`${apiUrl}/films/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(filmsById[id]));
  }),
  rest.get(`${apiUrl}/starships/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(starshipsById[id]));
  }),
];
