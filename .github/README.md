# Watch (Ohrwurm front-end)

Watch is the front-end for the <a href="https://github.com/snek-shipyard/ohrwurm">Ohrwurm</a> project. The Ohrwurm project is the attempt of creating a site that can handle the upload of records with member and project management. A member can have two different roles (supervisor and non-supervisor) and can be assigned to multiple projects. If a member is a supervisor he/she has the rights to execute add/delete/edit functions for members, projects and tracks, if a member is a non-supervisor he/she only has the rights to add tracks. When a member is added the supervisor that created the member gets an automatic generated random password that the member has to change on the next login. The front-end also features <a href="https://github.com/snek-shipyard/react-tag-input">React-Tag-Input</a>, a custom build tag selector where the user can choose the color for the tag. 

## [](#table-of-contents)Table of contents

-   [Table of contents](#table-of-contents)
-   [Quick start](#quick-start)

## [](#quick-start)Quick start

Several quick start options are available:

-   Clone the repo: `https://github.com/snek-shipyard/watch.git`

### This project requires the MDB React Pro license and its library

You can eigther:

Purchase MDB React Pro

-   Download the zip folder and extract it
-   Move the `mdbreact-X.XX.X.tgz` to the local copy of this repository

or use MDB React Free

-   Update "mdbreact" in `package.json` to the latest version of MDB (such as 4.19.0)
-   After installing, make sure to exclude all elements that require MDB React Pro

How to start this application?

-   Use `npm install` to install all dependencies
-   Start a local copy of the docs site with `npm start`
-   Or build a local copy of the library with `npm run build`

SPDX-License-Identifier: (EUPL-1.2)
Copyright © 2020-2021 Nico Schett
