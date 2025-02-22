# https://github.com/NixOS/nixpkgs/commit/e032e7ed264d9cae8793b947fce8c6205efeb272 

# Project generated with:
#   nix develop .
#   npx create-next-app@latest ./  --typescript --tailwind --eslint --app --src-dir --import-alias "@nutrigym/*" --empty --use-pnpm
#   pnpm dlx shadcn@latest init
#

{
  inputs = {
    nixpkgs.url = "https://github.com/NixOS/nixpkgs/archive/e032e7ed264d9cae8793b947fce8c6205efeb272.tar.gz";
    secrets.url = "https://github.com/chris-de-leon/secrets-cli/archive/refs/tags/v1.1.0.tar.gz";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, secrets, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            (final: prev: {
              scli = secrets.defaultPackage.${prev.system};
            })
          ];
        };
      in
      rec {
        formatter = pkgs.nixpkgs-fmt;

        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs.pkgs.pnpm
            pkgs.lastpass-cli
            pkgs.nodejs
            pkgs.sqlite
            pkgs.scli
          ];
        };
      }
    );
}

