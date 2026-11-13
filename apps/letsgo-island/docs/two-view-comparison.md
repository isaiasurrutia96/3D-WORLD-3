# Two-view reconstruction comparison

The sources are the overhead and angled images attached by the user on
13 November 2026. Both are 1536 by 1024. They are interpreted as one island.

The supplied reference images are not stored in this repository. Rendered
captures are generated from the real preview, not substituted concept art.

## Shared plan

- Irregular, pointed-front footprint replaces the previous rounded rectangle.
- The front grassy area is intentionally empty, with the large side trees
  set farther back than in the earlier preview.
- Five tree roots, five rock clusters and four shrubs are explicitly located.
- The raised rear-left patch connects to a lower apron around the high lawn.
- The high tree and rear rock pile share the upper lawn; the right rock pile
  sits on the lower ledge, matching their visible elevations.
- The pond is a stepped irregular inlet, with a shallow solid bed and a
  narrow outlet, rather than a rectangular opening and broad water curtain.
- Fixed rock-layer outlines taper to a point; no randomized scenery is added.
- Exactly three cloud groups complete the background.
- The illustrated character is excluded by the explicit no-avatar request.

## Camera and placement checks

Manual image anchors in reference-layout.js refer to trunk bases and
approximate cluster/bush centers. These points are uncertain by roughly a
voxel, sometimes more where leaves obscure the roots. Horizontal positions
are taken from the overhead image and retained for the angled image.

Angled and Overhead expose one model through different projection/camera
presets. The overhead preset uses parallel projection and an elevated view;
the angled preset uses mild perspective. Camera elevation, framing and the
tree canopies were refined together after comparing both real renders.

referenceLandmarks() can export projected points at the reference resolution.
These are placement checks against manually estimated anchors, not a pixel
difference against the source images and not an accuracy claim for hidden
geometry. Differences between the source perspectives are not corrected by
moving objects separately for each view.

## Visual refinement performed

The rendered pair was reviewed for silhouette, rear terraces, root/canopy
relationships, pond size/outlet, underside exposure, voxel rounding, shadow
softness and colors. Compared with the initial pair, the presets are less
steep/tilted where appropriate, the high tree is shorter, canopies reveal
more trunk, the upper rock pile is lifted onto its correct ledge, the
underside has warmer/lighter stone, and earth and water colors are clearer.

Material color grain is deterministic. Visible feature placement, path
cells, rock cells and the footprint do not depend on the grain function.

## Limits and minimum inferences

The angled and overhead illustrations are not perfectly projectively
consistent. The source does not expose every rear/underside block or the
pond floor. Explicit layer contours complete those regions, and a compact
shallow bed is inferred for the pond. Canopy volumes are fixed unions of
authored lobes rather than randomly scattered leaves.

Final screenshots should be reviewed visually against both supplied images.
Passing topology, performance-budget or UI tests does not establish visual
fidelity or literal block-for-block accuracy.
