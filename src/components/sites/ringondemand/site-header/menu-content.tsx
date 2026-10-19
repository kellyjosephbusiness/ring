import { ArrowRightIcon, TileGlyph } from "./icons";
import type { NavMenu, NavTile } from "./site-header.data";
import styles from "./site-header.module.css";

type Layout = "desktop" | "mobile";

function newTabProps(newTab?: boolean) {
  return newTab ? { target: "_blank", rel: "noopener" } : {};
}

function Tile({ tile, layout }: { tile: NavTile; layout: Layout }) {
  const mobile = layout === "mobile";
  const card = (
    <a
      className={styles.tile}
      href={tile.href}
      {...newTabProps(tile.newTab)}
      style={mobile ? { height: tile.mobileHeight } : undefined}
    >
      <span className={styles.tileTop}>
        <span className={styles.iconBox} data-static={tile.icon === "credit" || undefined}>
          <TileGlyph icon={tile.icon} className={styles.tileGlyph} />
        </span>
        <span className={styles.tileTitle}>{tile.title}</span>
      </span>
      <span className={styles.tileDesc}>{tile.description}</span>
    </a>
  );

  if (mobile && tile.mobileCollapsed) {
    // The source squeezes this tile into a 1px row on phones; only a sliver
    // of its top edge shows above the next card.
    return <div className={styles.tileCollapsed}>{card}</div>;
  }
  return card;
}

export function MenuContent({ menu, layout }: { menu: NavMenu; layout: Layout }) {
  const { video } = menu;
  return (
    <div className={layout === "desktop" ? styles.menuDesktop : styles.menuMobile}>
      <div className={styles.tiles}>
        {menu.tiles.map((tile) => (
          <Tile key={tile.title} tile={tile} layout={layout} />
        ))}
      </div>
      <a className={styles.video} href={video.href} {...newTabProps(video.newTab)}>
        <span className={styles.videoText}>
          <span className={styles.videoTop}>
            <span className={styles.videoTitle}>{video.title}</span>
            <span className={styles.videoDesc}>{video.description}</span>
          </span>
          <span className={styles.watch}>
            <span>Watch Video</span>
            <ArrowRightIcon className={styles.watchIcon} />
          </span>
        </span>
        <span className={styles.videoImg}>
          <img
            src={video.image}
            alt=""
            width={video.imageWidth}
            height={video.imageHeight}
            decoding="async"
          />
        </span>
      </a>
    </div>
  );
}
