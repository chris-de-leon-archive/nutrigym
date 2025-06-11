# Project generated with:
#   nix develop .
#   npx create-next-app@latest ./  --typescript --tailwind --eslint --app --src-dir --import-alias "@nutrigym/*" --empty --use-pnpm
#   pnpm dlx shadcn@latest init
#
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    utils,
  }:
    utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {inherit system;};
      in rec {
        formatter = pkgs.alejandra;

        devShells = {
          default = pkgs.mkShell {
            packages = [
              pkgs.nodejs.pkgs.pnpm
              pkgs.infisical
              pkgs.nodejs
              pkgs.sqlite
            ];
          };
        };
      }
    );
}
