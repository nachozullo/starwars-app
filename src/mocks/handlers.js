import { rest } from "msw";

export const apiUrl = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.get(`${apiUrl}/people`, (req, res, ctx) => {
    const onlyLast = req.url.searchParams.get("last");

    return res(ctx.status(200), ctx.json(onlyLast ? { something: metrics["-MLJWhsowk_rub1NKslz"] } : metrics));
  }),
  rest.get(`${apiUrl}/species`, (_req, res, ctx) => res(ctx.status(200), ctx.json(installments))),
];
