import sqlite3
import matplotlib.pyplot as plt
import networkx as nx

def get_graph_data_from_sqlite():
    conn = sqlite3.connect('patch_intelligence.db')
    cursor = conn.cursor()

    cursor.execute('''
        SELECT p.name AS from_name, 'product' AS from_type,
               c.cve_id AS to_name, 'cve' AS to_type, 'PATCHES' AS edge_type
        FROM products p
        JOIN relationships r ON p.id = r.product_id
        JOIN cves c ON c.id = r.cve_id
    ''')
    product_to_cve_data = cursor.fetchall()

    cursor.execute('''
        SELECT p.name AS from_name, 'product' AS from_type,
               cp.cpe AS to_name, 'cpe' AS to_type, 'RELATED_TO' AS edge_type
        FROM products p
        JOIN relationships r ON p.id = r.product_id
        JOIN cpes cp ON cp.id = r.cpe_id
    ''')
    product_to_cpe_data = cursor.fetchall()

    conn.close()

    return [
        {'from': row[0], 'from_type': row[1], 'to': row[2], 'to_type': row[3], 'edge_type': row[4]}
        for row in product_to_cve_data + product_to_cpe_data
    ]

def visualize_with_networkx(graph_data, output_file="graph_output.jpg"):
    G = nx.DiGraph()

    for item in graph_data:
        G.add_node(item['from'], type=item['from_type'])
        G.add_node(item['to'], type=item['to_type'])
        G.add_edge(item['from'], item['to'], type=item['edge_type'])

    node_colors = {'product': 'lightblue', 'cve': 'lightcoral', 'cpe': 'lightgreen'}
    edge_colors = {'PATCHES': 'blue', 'RELATED_TO': 'green'}

    node_color_list = [node_colors[G.nodes[node]['type']] for node in G.nodes]
    edge_color_list = [edge_colors[G.edges[edge]['type']] for edge in G.edges]

    pos = nx.spring_layout(G, k=2.5, scale=5.5)  # Slightly more spread out

    plt.figure(figsize=(22, 18))  # Same large canvas
    ax = plt.gca()

    nx.draw(G, pos, node_color=node_color_list, edge_color=edge_color_list,
            node_size=2500, font_size=0, width=0.8, alpha=0.6, ax=ax,
            connectionstyle="arc3,rad=0.2", arrowsize=8)

    for node, (x, y) in pos.items():
        font_size = max(7, 14 - len(node) // 4)  # Auto-adjust font size
        ax.text(x, y, node, fontsize=font_size, fontweight="bold",
                horizontalalignment='center', verticalalignment='center', color="black")

    from matplotlib.lines import Line2D
    legend_elements = [
        Line2D([0], [0], marker='o', color='w', label='Product', markerfacecolor='lightblue', markersize=10),
        Line2D([0], [0], marker='o', color='w', label='CVE', markerfacecolor='lightcoral', markersize=10),
        Line2D([0], [0], marker='o', color='w', label='CPE', markerfacecolor='lightgreen', markersize=10),
        Line2D([0], [0], color='blue', lw=2, label='PATCHES'),
        Line2D([0], [0], color='green', lw=2, label='RELATED_TO')
    ]

    plt.legend(handles=legend_elements, title="Legend", loc='upper right', fontsize=10)
    plt.title("Product, CVE, and CPE Relationships", fontsize=12)
    plt.savefig(output_file, format='jpg', dpi=300)
    plt.close()

def main():
    graph_data = get_graph_data_from_sqlite()
    visualize_with_networkx(graph_data, output_file="graph_output.jpg")

if __name__ == '__main__':
    main()
