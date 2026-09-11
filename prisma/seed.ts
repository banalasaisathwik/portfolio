import { prisma } from "../src/lib/prisma"
import { stringifyList } from "../src/lib/list-fields"

async function main() {
  console.log("Cleaning database...")
  // Wipe existing data to prevent slug collisions
  await prisma.architecture.deleteMany()
  await prisma.project.deleteMany()

  console.log("Seeding featured systems...")

  // 1. FEATURED: Full details, all icons, architectures, and video
  await prisma.project.create({
    data: {
      title: 'WebRTC Conferencing Node',
      slug: 'webrtc-conferencing-node',
      shortDescription: 'A highly scalable communication platform supporting multi-party video, screen sharing, and dynamic participant management.',
      overview: 'Engineered a low-latency transport layer to handle concurrent data streams. The system manages producer/consumer state effectively to ensure packet delivery without overwhelming client bandwidth.',
      engineeringDecisions: 'Chose Mediasoup over standard SFU architectures to maintain granular control over the router transports. Implemented WebRTC data channels for low-latency chat and state synchronization alongside the media tracks.',
      codeWalkthrough: 'The core complexity lies in track management when participants leave the session. The `closeTransport` routine ensures memory is freed on the server instantly to prevent memory leaks during high-volume cohort sessions.',
      githubUrl: 'https://github.com/example/webrtc-node',
      liveUrl: 'https://webrtc-conferencing.example.com',
      featured: true, // Will show as a giant card
      order: 0,
      techStack: stringifyList(['WebRTC', 'Mediasoup', 'TypeScript', 'Node.js', 'Next.js']),
      architectures: {
        create: [
          {
            title: 'Transport Layer State Flow',
            description: 'Mapping the sequence of SDP negotiations between the client device and the Mediasoup worker.',
            imageUrl: 'https://raw.githubusercontent.com/excalidraw/excalidraw/master/public/apple-touch-icon.png',
            videoUrl: 'https://youtube.com',
            excalidrawUrl: 'https://excalidraw.com/#json=example-transport-layer',
          },
          {
            title: 'Participant Lifecycle',
            description: 'Database schema and memory cache invalidation strategy when a user abruptly drops connection.',
            imageUrl: 'https://raw.githubusercontent.com/excalidraw/excalidraw/master/public/apple-touch-icon.png', 
          }
        ]
      }
    },
  })

  // 2. FEATURED: Code-heavy experiment, no live URL or video
  await prisma.project.create({
    data: {
      title: 'Distributed Tensor Processing',
      slug: 'tensor-manipulation-pipeline',
      shortDescription: 'Deep learning experiments focusing on efficient tensor manipulation and neural network architectures.',
      overview: 'Developed custom operations to optimize memory allocation during massive matrix multiplications. The pipeline handles data reshaping and dimensional viewing to feed into deep neural networks rapidly.',
      lessonsLearned: 'Memory fragmentation becomes a severe bottleneck when rapidly reshaping tensors without pre-allocating contiguous memory blocks.',
      githubUrl: 'https://github.com/example/tensor-ops',
      featured: true, // Will show as a giant card
      order: 1,
      techStack: stringifyList(['PyTorch', 'Python', 'CUDA', 'C++']),
    },
  })

  console.log("Seeding system archive...")

  // 3. ARCHIVE: High-throughput backend
  await prisma.project.create({
    data: {
      title: 'Real-time Analytics Engine',
      slug: 'analytics-engine',
      shortDescription: 'High-throughput data ingestion pipeline handling 10k+ events per second with graceful degradation.',
      overview: 'Built a streaming architecture to process incoming telemetry data, aggregate it in memory, and flush to persistent storage in optimized batches to prevent I/O blocking.',
      githubUrl: 'https://github.com/example/analytics',
      featured: false, // Will show in the sleek list
      order: 0,
      techStack: stringifyList(['Go', 'Kafka', 'PostgreSQL', 'Redis']),
    },
  })

  // 4. ARCHIVE: Security / Auth Gateway
  await prisma.project.create({
    data: {
      title: 'Zero-Trust Identity Gateway',
      slug: 'identity-gateway',
      shortDescription: 'A centralized authentication microservice utilizing stateless JWT validation and Redis token blocklisting.',
      overview: 'Designed a security perimeter for microservices. Handled edge-based token verification to offload cryptographic compute costs from downstream internal services.',
      featured: false, // Will show in the sleek list
      order: 1,
      techStack: stringifyList(['Rust', 'Redis', 'Docker', 'gRPC']),
    },
  })

  // 5. ARCHIVE: API Architecture
  await prisma.project.create({
    data: {
      title: 'Federated GraphQL API',
      slug: 'federated-graphql',
      shortDescription: 'Unified data graph stitching together five disparate REST subgraphs into a single queryable endpoint.',
      overview: 'Implemented Apollo Federation to allow frontend teams to query complex relational data without writing N+1 waterfall requests to the underlying legacy microservices.',
      featured: false, // Will show in the sleek list
      order: 2,
      techStack: stringifyList(['GraphQL', 'Apollo Node', 'TypeScript', 'Express']),
    },
  })

  console.log("Seeding complete! 🚀")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
