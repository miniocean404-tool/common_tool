import { URL } from "@tarojs/runtime";

String.prototype.query = function (strs, ...exprs) {
  const res = exprs.reduce(
    (res, exp, index) => {
      const val = typeof exp === "function" ? exp(this.props) : exp;
      return res + val + strs[index + 1];
    },
    [strs[0]],
  );

  const url = new URL(this);

  const regexp = /(?<key>\S*):(?<value>.*),/gm;

  let match;
  while ((match = regexp.exec(res))) {
    const { key, value } = match.groups;
    url.searchParams.set(key.trim(), value.trim());
  }

  return url.href;
};
